import React from "react";

interface ActionButtonsProps {
  selectedAction: "All" | "Send" | "Fund" | "Convert" | "Withdraw" | "P2P" | "Bill Payments";
  onActionChange: (action: "All" | "Send" | "Fund" | "Convert" | "Withdraw" | "P2P" | "Bill Payments") => void;
  transactionType: "All" | "Fiat" | "Crypto";
  selectedCryptoAction: string;
  onCryptoActionChange: (action: string) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  selectedAction,
  onActionChange,
  transactionType,
  selectedCryptoAction,
  onCryptoActionChange
}) => {
  const actionButtons: ("All" | "Send" | "Fund" | "Convert" | "Withdraw" | "P2P" | "Bill Payments")[] = [
    "All", "Send", "Fund", "Convert", "Withdraw", "P2P", "Bill Payments"
  ];
  const cryptoActions = ["All", "Deposit", "Withdraw", "P2P"];

  return (
    <>
      {/* Action Buttons Container */}
      {transactionType !== 'Crypto' && (
        <div className="flex items-center" style={{
          width: '433px',
          height: '34px',
          borderRadius: '100px',
          borderWidth: '0.3px',
          borderStyle: 'solid',
          borderColor: '#FFFFFF33',
          backgroundColor: '#FFFFFF0D',
          paddingTop: '2px',
          paddingBottom: '2px',
          paddingLeft: '0',
          paddingRight: '16px',
          gap: '8px'
        }}>
          {actionButtons.map((action) => (
            <button
              key={action}
              onClick={() => onActionChange(action)}
              className={`font-normal transition-colors whitespace-nowrap ${selectedAction === action
                ? 'text-black'
                : 'text-white'
                }`}
              style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '10px',
                lineHeight: '100%',
                letterSpacing: '0%',
                height: '30px',
                borderRadius: '100px',
                padding: '0 12px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '0',
                ...(selectedAction === action ? {
                  backgroundColor: '#A9EF45',
                  color: '#000000'
                } : {
                  backgroundColor: 'transparent',
                  color: '#FFFFFF'
                })
              }}
            >
              {action}
            </button>
          ))}
        </div>
      )}
      {/* Crypto Action Buttons */}
      {transactionType === 'Crypto' && (
        <div className="flex items-center" style={{
          width: 'auto',
          height: '34px',
          borderRadius: '100px',
          borderWidth: '0.3px',
          borderStyle: 'solid',
          borderColor: '#FFFFFF33',
          backgroundColor: '#FFFFFF0D',
          paddingTop: '2px',
          paddingBottom: '2px',
          paddingLeft: '0',
          paddingRight: '0',
          gap: '4px'
        }}>
          {cryptoActions.map((action) => (
            <button
              key={action}
              onClick={() => onCryptoActionChange(action)}
              className={`font-normal transition-colors whitespace-nowrap ${selectedCryptoAction === action
                ? 'text-black'
                : 'text-white'
                }`}
              style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '10px',
                lineHeight: '100%',
                letterSpacing: '0%',
                height: '30px',
                borderRadius: '100px',
                padding: '0 12px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: action === 'P2P' ? 'auto' : '0',
                ...(selectedCryptoAction === action ? {
                  backgroundColor: '#A9EF45',
                  color: '#000000'
                } : {
                  backgroundColor: 'transparent',
                  color: '#FFFFFF'
                })
              }}
            >
              {action}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default ActionButtons;

