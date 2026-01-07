import React from "react";
import { useNavigate } from "react-router-dom";
import images from "../../constants/images";
import { Transaction, ActionType } from "./types";

interface TransactionTableProps {
  transactions: Transaction[];
  selectedAction: ActionType;
  transactionType: "All" | "Fiat" | "Crypto";
  selectedTransactions: Set<string>;
  startIndex: number;
  onSelectAll: () => void;
  onSelectTransaction: (index: number) => void;
  onTransactionClick: (transaction: Transaction) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  selectedAction,
  transactionType,
  selectedTransactions,
  startIndex,
  onSelectAll,
  onSelectTransaction,
  onTransactionClick
}) => {
  const navigate = useNavigate();

  return (
    <div style={{ width: '100%', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px', overflow: 'hidden' }}>
      {/* Table Header */}
      <div style={{ backgroundColor: '#1C2530', width: '100%' }}>
        <table className="w-full" style={{ height: '60px', width: '100%', tableLayout: 'auto' }}>
          <thead>
            <tr style={{ height: '60px', width: '100%' }}>
              <th className="text-left py-3" style={{ verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '24px', paddingRight: '12px' }}>
                <div className="relative inline-block" style={{ width: '16px', height: '16px' }}>
                  <input
                    type="checkbox"
                    checked={transactions.length > 0 && transactions.every((_, index) => selectedTransactions.has((startIndex + index).toString()))}
                    onChange={onSelectAll}
                    className="rounded cursor-pointer"
                    style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: transactions.length > 0 && transactions.every((_, index) => selectedTransactions.has((startIndex + index).toString())) ? '#A9EF45' : 'transparent',
                      borderColor: 'white',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      outline: 'none',
                      margin: 0,
                      padding: 0,
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      zIndex: 1
                    }}
                  />
                  {selectedTransactions.size === transactions.length && transactions.length > 0 && (
                    <svg
                      className="absolute pointer-events-none"
                      style={{
                        width: '10px',
                        height: '10px',
                        top: '3px',
                        left: '3px',
                        marginTop: '2px',
                        zIndex: 2
                      }}
                      fill="none"
                      stroke="black"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </th>
              <th
                className="text-left py-3 text-white"
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  verticalAlign: 'middle',
                  backgroundColor: '#1C2530',
                  paddingLeft: '0px',
                  paddingRight: '40px'
                }}
              >
                {selectedAction === 'All' ? 'User Name' : 'Transaction id'}
              </th>
              {selectedAction === 'Convert' ? (
                <>
                  <th className="text-left py-3 text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '0px', paddingRight: '42px' }}>Amount Sent</th>
                  <th className="text-left py-3 text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '0px', paddingRight: '42px' }}>Received</th>
                  <th className="text-left py-3 text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '0px', paddingRight: '2px' }}>Status</th>
                  <th className="text-left py-3 text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '50px', paddingRight: '42px' }}>Rate</th>
                  <th className="text-left py-3 text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '0px', paddingRight: '82px' }}>Conversion</th>
                </>
              ) : (
                <>
                  <th
                    className="text-left py-3 text-white"
                    style={{
                      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: '12px',
                      fontWeight: 400,
                      verticalAlign: 'middle',
                      backgroundColor: '#1C2530',
                      paddingLeft: selectedAction === 'All' ? '24px' : '0px',
                      paddingRight: '42px'
                    }}
                  >
                    Amount
                  </th>
                  {selectedAction === 'All' ? (
                    <>
                      <th className="text-left py-3 text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '0px', paddingRight: '32px' }}>Country</th>
                      <th className="text-left py-3 text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '0px', paddingRight: '32px' }}>Category</th>
                      <th className="text-left py-3 text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '0px', paddingRight: '22px' }}>Type</th>
                      <th className="text-left py-3 text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '0px', paddingRight: '32px' }}>Status</th>
                    </>
                  ) : (
                    <>
                      <th className="text-left py-3 text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '0px', paddingRight: '2px' }}>Status</th>
                      {transactionType === 'Crypto' ? (
                        <>
                          <th className="text-left py-3 text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '90px', paddingRight: '32px' }}>Crypto</th>
                          <th className="text-left py-3 text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '40px', paddingRight: '162px' }}>Network</th>
                        </>
                      ) : (
                        <>
                          <th className="text-left py-3 text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '50px', paddingRight: '32px' }}>Country</th>
                          <th className="text-left py-3 text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: selectedAction === 'P2P' || selectedAction === 'Bill Payments' ? '40px' : '40px', paddingRight: '122px' }}>
                            {selectedAction === 'P2P' ? 'Vendor Name' : selectedAction === 'Bill Payments' ? 'Type' : 'Route'}
                          </th>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
              {selectedAction !== 'All' && (
                <th className="text-left py-3 text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '0px', paddingRight: '62px' }}>Date</th>
              )}
              <th className="text-left py-3 text-white" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, verticalAlign: 'middle', backgroundColor: '#1C2530', paddingLeft: '60px', paddingRight: '32px' }}>Action</th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Table Body */}
      <div style={{ backgroundColor: '#0F1825', width: '100%' }}>
        <table className="w-full" style={{ width: '100%', tableLayout: 'auto' }}>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={index}
                className="border-b border-[#2B363E] hover:bg-[#1A252F] transition-colors"
                style={{ height: '60px' }}
              >
                <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '24px', paddingRight: '12px' }}>
                  <div className="relative inline-block" style={{ width: '16px', height: '16px' }}>
                    <input
                      type="checkbox"
                      checked={selectedTransactions.has((startIndex + index).toString())}
                      onChange={() => onSelectTransaction(index)}
                      className="rounded cursor-pointer"
                      style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: selectedTransactions.has((startIndex + index).toString()) ? '#A9EF45' : 'transparent',
                        borderColor: 'white',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        outline: 'none',
                        margin: 0,
                        padding: 0,
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        cursor: 'pointer',
                        position: 'relative',
                        zIndex: 1
                      }}
                    />
                    {selectedTransactions.has((startIndex + index).toString()) && (
                      <svg
                        className="absolute pointer-events-none"
                        style={{
                          width: '10px',
                          height: '10px',
                          top: '3px',
                          left: '3px',
                          marginTop: '2px',
                          zIndex: 2
                        }}
                        fill="none"
                        stroke="black"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </td>
                <td
                  className="text-left py-3"
                  style={{
                    fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: '12px',
                    fontWeight: 400,
                    color: '#D1D5DB',
                    verticalAlign: 'middle',
                    paddingLeft: '0px',
                    paddingRight: selectedAction === 'Convert' ? '30px' : '42px'
                  }}
                >
                  {selectedAction === 'All' ? (
                    <div className="flex items-center gap-3">
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#A9EF45',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        overflow: 'hidden'
                      }}>
                        <img
                          src={images.avater1}
                          alt={(transaction as any).recipient || transaction.id}
                          className="rounded-full object-cover"
                          style={{
                            width: '100%',
                            height: '100%'
                          }}
                        />
                      </div>
                      <span>{(transaction as any).recipient || transaction.id}</span>
                    </div>
                  ) : (
                    transaction.id
                  )}
                </td>
                {selectedAction === 'Convert' ? (
                  <>
                    <td className="text-left py-3" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, color: '#D1D5DB', verticalAlign: 'middle', paddingLeft: '70px', paddingRight: '42px' }}>
                      {(transaction as any).amountSent || transaction.amount}
                    </td>
                    <td className="text-left py-3" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, color: '#D1D5DB', verticalAlign: 'middle', paddingLeft: '60px', paddingRight: '42px' }}>
                      {(transaction as any).received || '-'}
                    </td>
                    <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '30px', paddingRight: '32px' }}>
                      <div className="flex items-center">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: transaction.status === 'success' ? '#008000' : transaction.status === 'failed' ? '#FF0000' : '#FFD700' }}></span>
                      </div>
                    </td>
                    <td className="text-left py-3" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, color: '#D1D5DB', verticalAlign: 'middle', paddingLeft: '30px', paddingRight: '42px' }}>
                      {(transaction as any).rate || '-'}
                    </td>
                    <td className="text-left py-3" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, color: '#D1D5DB', verticalAlign: 'middle', paddingLeft: '20px', paddingRight: '122px' }}>
                      {(transaction as any).conversion || '-'}
                    </td>
                  </>
                ) : (
                  <>
                    <td
                      className="text-left py-3"
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        fontSize: '12px',
                        fontWeight: 400,
                        color: '#D1D5DB',
                        verticalAlign: 'middle',
                        paddingLeft: selectedAction === 'All' ? '24px' : '0px',
                        paddingRight: selectedAction === 'All' ? '62px' : '0px'
                      }}
                    >
                      {transaction.amount}
                    </td>
                    {selectedAction === 'All' ? (
                      <>
                        <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '32px' }}>
                          <div className="flex items-center gap-2">
                            <img
                              src={images.flag}
                              alt={(transaction as any).country || 'Country'}
                              className="w-5 h-3 object-cover rounded"
                            />
                            <span style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, color: '#D1D5DB' }}>
                              {(transaction as any).country || 'Nigeria'}
                            </span>
                          </div>
                        </td>
                        <td className="text-left py-3" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, color: '#D1D5DB', verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '32px' }}>
                          {(transaction as any).category || ((transaction as any).crypto ? 'Crypto' : 'Fiat')}
                        </td>
                        <td className="text-left py-3" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, color: '#D1D5DB', verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '32px' }}>
                          {(transaction as any).transactionType || ((transaction as any).crypto ? 'Deposit' : 'Bank Transfer')}
                        </td>
                        <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '32px' }}>
                          <div className="flex items-center">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: transaction.status === 'success' ? '#008000' : transaction.status === 'failed' ? '#FF0000' : '#FFD700' }}></span>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '72px' }}>
                          <div className="flex items-center">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: transaction.status === 'success' ? '#008000' : transaction.status === 'failed' ? '#FF0000' : '#FFD700' }}></span>
                          </div>
                        </td>
                        {transactionType === 'Crypto' ? (
                          <>
                            <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '62px' }}>
                              <div className="flex items-center gap-2">
                                <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                                  <img src={(transaction as any).cryptoLogo || images.image_26} alt={(transaction as any).crypto || 'Ethereum'} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                                </div>
                                <span style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, color: '#D1D5DB' }}>
                                  {(transaction as any).crypto || 'Ethereum'}
                                </span>
                              </div>
                            </td>
                            <td className="text-left py-3" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, color: '#D1D5DB', verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '135px' }}>
                              {(transaction as any).network || 'Ethereum'}
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '62px' }}>
                              <div className="flex items-center gap-2">
                                <img src={images.flag} alt={(transaction as any).country || 'Country'} className="w-5 h-3 object-cover rounded" />
                                <span style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, color: '#D1D5DB' }}>
                                  {(transaction as any).country || 'Nigeria'}
                                </span>
                              </div>
                            </td>
                            <td className="text-left py-3" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, color: '#D1D5DB', verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '72px' }}>
                              {selectedAction === 'P2P' ? ((transaction as any).vendorName || (transaction as any).recipient) : selectedAction === 'Bill Payments' ? ((transaction as any).type || (transaction as any).route) : (transaction as any).route}
                            </td>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
                {selectedAction !== 'All' && (
                  <td className="text-left py-3" style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '12px', fontWeight: 400, color: '#D1D5DB', verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '62px' }}>
                    {transaction.date}
                  </td>
                )}
                <td className="py-3" style={{ verticalAlign: 'middle', paddingLeft: '0px', paddingRight: '24px' }}>
                  {selectedAction === 'All' ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onTransactionClick(transaction)}
                        className="text-xs font-normal rounded-full whitespace-nowrap"
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          backgroundColor: '#95D440',
                          color: '#000000',
                          padding: '6px 12px',
                          cursor: 'pointer',
                          border: 'none'
                        }}
                      >
                        Details
                      </button>
                      <button
                        onClick={() => {
                          if ((transaction as any).recipient) {
                            const username = (transaction as any).recipient.replace(/\s+/g, '-').toLowerCase();
                            navigate(`/user/management/${username}/transactions`);
                          }
                        }}
                        className="text-xs font-normal rounded-full whitespace-nowrap"
                        style={{
                          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                          backgroundColor: '#000000',
                          color: '#FFFFFF',
                          padding: '6px 12px',
                          cursor: 'pointer',
                          border: 'none'
                        }}
                      >
                        Profile
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onTransactionClick(transaction)}
                      className="text-xs font-normal rounded-full whitespace-nowrap"
                      style={{
                        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                        backgroundColor: '#95D440',
                        color: '#000000',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        border: 'none'
                      }}
                    >
                      Full Details
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;

