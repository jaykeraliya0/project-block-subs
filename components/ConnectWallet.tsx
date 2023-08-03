"use client";
type Props = {
  className?: string;
};

const ConnectWallet = ({ className }: Props) => {
  return (
    <>
      <button className={className}>
        Connect
      </button>
    </>
  );
};

export default ConnectWallet;
