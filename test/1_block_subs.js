const BlockSubs = artifacts.require("BlockSubs");

contract("BlockSubs", (accounts) => {
  const owner = accounts[0];
  const user1 = accounts[1];
  const user2 = accounts[2];

  let blockSubs;

  beforeEach(async () => {
    blockSubs = await BlockSubs.new({ from: owner });
  });

  it("should register a user with a valid name", async () => {
    const name = "Alice";

    await blockSubs.registerUser(name, { from: user1 });
    const user = await blockSubs.getUser(user1);

    assert.equal(user.name, name);
  });

  it("should not register a user with an empty name", async () => {
    const name = "";

    try {
      await blockSubs.registerUser(name, { from: user1 });
      assert.fail("Expected an error");
    } catch (error) {
      assert.include(error.message, "Name must not be empty");
    }
  });

  it("should not register a user if already registered", async () => {
    const name = "Bob";

    await blockSubs.registerUser(name, { from: user1 });

    try {
      await blockSubs.registerUser(name, { from: user1 });
      assert.fail("Expected an error");
    } catch (error) {
      assert.include(error.message, "User already registered");
    }
  });

  it("should add a subscription for a registered user", async () => {
    const name = "Charlie";
    const role = 1; // Role.Gold

    await blockSubs.registerUser(name, { from: user1 });
    await blockSubs.mintTokens(2000, {
      from: user1,
      value: 200000000000000000,
    });
    await blockSubs.addSubscription(role, { from: user1 });

    const user = await blockSubs.getUser(user1);
    assert.equal(user.roleId, role);
  });

  it("should not add a subscription for an unregistered user", async () => {
    const role = 1; // Role.Gold

    try {
      await blockSubs.addSubscription(role, { from: user1 });
      assert.fail("Expected an error");
    } catch (error) {
      assert.include(error.message, "User not registered");
    }
  });

  it("should not add an invalid subscription role", async () => {
    const name = "Charlie";
    const role = 4; // Invalid role

    await blockSubs.registerUser(name, { from: user1 });
    await blockSubs.mintTokens(2000, {
      from: user1,
      value: 200000000000000000,
    });

    try {
      await blockSubs.addSubscription(role, { from: user1 });
    } catch (error) {
      assert.include(error.message, "Invalid role");
    }
  });

  it("should cancel an active subscription", async () => {
    const name = "Eve";
    const role = 2; // Role.Diamond

    await blockSubs.registerUser(name, { from: user1 });
    await blockSubs.mintTokens(2000, {
      from: user1,
      value: 200000000000000000,
    });
    await blockSubs.addSubscription(role, { from: user1 });
    await blockSubs.cancelSubscription({ from: user1 });

    const user = await blockSubs.getUser(user1);
    assert.equal(user.roleId, 0);
  });

  it("should not cancel an inactive subscription", async () => {
    const name = "Frank";
    const role = 3; // Role.Platinum

    await blockSubs.registerUser(name, { from: user1 });
    await blockSubs.mintTokens(2000, {
      from: user1,
      value: 200000000000000000,
    });
    await blockSubs.addSubscription(role, { from: user1 });
    await blockSubs.cancelSubscription({ from: user1 });

    try {
      await blockSubs.cancelSubscription({ from: user1 });
      assert.fail("Expected an error");
    } catch (error) {
      assert.include(error.message, "No active subscription to cancel");
    }
  });

  it("should mint tokens for a user", async () => {
    const amount = 100;

    await blockSubs.mintTokens(amount, {
      from: user1,
      value: 10000000000000000,
    });

    const balance = await blockSubs.balanceOf(user1);
    assert.equal(balance, amount);
  });

  it("should not mint tokens with an incorrect payment amount", async () => {
    const amount = 100;

    try {
      await blockSubs.mintTokens(amount, {
        from: user1,
        value: 20000000000000000,
      });
      assert.fail("Expected an error");
    } catch (error) {
      assert.include(error.message, "Incorrect payment amount");
    }
  });

  it("should transfer tokens from one user to another", async () => {
    const amount = 100;

    await blockSubs.mintTokens(amount, {
      from: user1,
      value: 10000000000000000,
    });
    await blockSubs.transfer(user2, amount, { from: user1 });

    const senderBalance = await blockSubs.balanceOf(user1);
    const recipientBalance = await blockSubs.balanceOf(user2);

    assert.equal(senderBalance, 0);
    assert.equal(recipientBalance, amount);
  });

  it("should not transfer tokens if sender has insufficient balance", async () => {
    const amount = 100;

    await blockSubs.mintTokens(amount, {
      from: user1,
      value: 10000000000000000,
    });

    try {
      await blockSubs.transfer(user2, amount + 1, { from: user1 });
      assert.fail("Expected an error");
    } catch (error) {
      assert.include(error.message, "Insufficient balance for transfer");
    }
  });

  it("should not transfer tokens to a zero address", async () => {
    const amount = 100;

    await blockSubs.mintTokens(amount, {
      from: user1,
      value: 10000000000000000,
    });

    try {
      await blockSubs.transfer(
        "0x0000000000000000000000000000000000000000",
        amount,
        { from: user1 }
      );
      assert.fail("Expected an error");
    } catch (error) {
      assert.include(error.message, "Transfer to zero address is not allowed");
    }
  });
});
