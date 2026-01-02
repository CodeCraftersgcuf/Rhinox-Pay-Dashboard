import React from "react";
import { ActionType } from "./types";

interface ActionButtonsProps {
  selectedAction: ActionType;
  onActionChange: (action: ActionType) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ selectedAction, onActionChange }) => {
  const actionButtons: ActionType[] = ["Send", "Fund", "Convert", "Withdraw", "P2P", "Bill Payments"];

  return (
    <div className="flex items-center" style={{
      width: '390px',
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
  );
};

export default ActionButtons;

