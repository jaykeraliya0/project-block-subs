// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BlockSubs is ERC20, Ownable {
    enum Role {
        Silver,
        Gold,
        Diamond,
        Platinum,
        None
    }

    struct Subscription {
        Role roleId;
        uint256 expiration;
        uint256 cancelationTime;
    }

    struct User {
        string name;
        Subscription subscription;
    }

    mapping(address => User) private _users;
    mapping(Role => uint256) private _rolePrices;

    uint256 private constant DURATION = 30 days;
    uint256 private constant _TOKEN_PRICE = 0.0001 ether;
    uint256 private constant _MAX_MINT_AMOUNT = 2000;

    bool private _isProcessingCancellation;

    constructor() ERC20("BlockSubs", "BSB") {
        _rolePrices[Role.Silver] = 10;
        _rolePrices[Role.Gold] = 20;
        _rolePrices[Role.Diamond] = 30;
        _rolePrices[Role.Platinum] = 40;
    }

    function registerUser(string memory name) public {
        require(bytes(name).length > 0, "Name must not be empty");
        require(
            bytes(_users[msg.sender].name).length == 0,
            "User already registered"
        );

        _users[msg.sender].name = name;
    }

    function getUser(
        address account
    )
        external
        view
        returns (
            string memory name,
            Role roleId,
            uint256 expiration,
            uint256 cancelationTime
        )
    {
        User storage user = _users[account];
        return (
            user.name,
            user.subscription.roleId,
            user.subscription.expiration,
            user.subscription.cancelationTime
        );
    }

    function addSubscription(Role role) public {
        require(role != Role.None, "Invalid role");
        require(
            bytes(_users[msg.sender].name).length > 0,
            "User not registered"
        );
        require(
            balanceOf(msg.sender) >= _rolePrices[role],
            "Insufficient balance"
        );

        User storage user = _users[msg.sender];
        Subscription storage subscription = user.subscription;

        require(
            subscription.roleId == Role.None ||
                subscription.expiration < block.timestamp,
            "Existing subscription still active"
        );

        uint256 expiration = block.timestamp + DURATION;
        subscription.roleId = role;
        subscription.expiration = expiration;
        subscription.cancelationTime = 0;

        _transfer(msg.sender, address(this), _rolePrices[role]);
    }

    function cancelSubscription() public {
        User storage user = _users[msg.sender];
        Subscription storage subscription = user.subscription;

        require(
            subscription.roleId != Role.None &&
                subscription.expiration > block.timestamp,
            "No active subscription to cancel"
        );

        require(!_isProcessingCancellation, "Cancellation in progress");
        _isProcessingCancellation = true;

        uint256 remainingTime = subscription.expiration - block.timestamp;
        uint256 refundAmount = (remainingTime *
            _rolePrices[subscription.roleId]) / DURATION;

        subscription.roleId = Role.None;
        subscription.cancelationTime = block.timestamp;

        _isProcessingCancellation = false;
        _transfer(address(this), msg.sender, refundAmount);
    }

    function mintTokens(uint256 amount) public payable {
        require(amount > 0, "Amount must be greater than zero");
        require(
            balanceOf(msg.sender) + amount <= _MAX_MINT_AMOUNT,
            "Exceeds maximum amount per wallet"
        );
        require(msg.value == amount * _TOKEN_PRICE, "Incorrect payment amount");

        _mint(msg.sender, amount);
    }

    function transfer(
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        require(
            recipient != address(0),
            "Transfer to zero address is not allowed"
        );
        require(
            balanceOf(msg.sender) >= amount,
            "Insufficient balance for transfer"
        );

        _transfer(msg.sender, recipient, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        require(
            sender != address(0),
            "Transfer from zero address is not allowed"
        );
        require(
            recipient != address(0),
            "Transfer to zero address is not allowed"
        );
        require(
            balanceOf(sender) >= amount,
            "Insufficient balance for transfer"
        );
        require(
            allowance(sender, msg.sender) >= amount,
            "Transfer exceeds allowance"
        );

        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, allowance(sender, msg.sender) - amount);
        return true;
    }

    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal override {
        require(
            sender != address(0),
            "Transfer from zero address is not allowed"
        );
        require(
            recipient != address(0),
            "Transfer to zero address is not allowed"
        );

        super._transfer(sender, recipient, amount);
    }
}
