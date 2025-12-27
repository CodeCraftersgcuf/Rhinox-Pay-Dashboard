import React from "react";
import images from "../../constants/images";

interface UserMetricCardsProps {
  totalUsers: string;
  newUsers: string;
  activeUsers: string;
}

const UserMetricCards: React.FC<UserMetricCardsProps> = ({ totalUsers, newUsers, activeUsers }) => {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div
          className="rounded-lg overflow-hidden"
          style={{
            width: '354px',
            height: '90px',
            borderRadius: '10px',
            background: 'linear-gradient(to right, #4880C0, #1B589E)'
          }}
        >
          <div className="p-4 h-full flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#4887CF' }}
            >
              <img src={images.UsersThree} alt="Users" className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white mb-1" style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '10px',
                fontWeight: 274,
                fontStyle: 'normal',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}>Total Users</p>
              <h2 className="text-white" style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 510,
                fontStyle: 'normal',
                fontSize: '30px',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}>{totalUsers}</h2>
            </div>
          </div>
        </div>

        {/* New Users Card */}
        <div
          className="rounded-lg overflow-hidden"
          style={{
            width: '354px',
            height: '90px',
            borderRadius: '10px',
            background: 'linear-gradient(to right, #4880C0, #1B589E)'
          }}
        >
          <div className="p-4 h-full flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#4887CF' }}
            >
              <img src={images.UsersThree} alt="Users" className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white mb-1" style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '10px',
                fontWeight: 274,
                fontStyle: 'normal',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}>New Users</p>
              <h2 className="text-white" style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 510,
                fontStyle: 'normal',
                fontSize: '30px',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}>{newUsers}</h2>
            </div>
          </div>
        </div>

        {/* Active Users Card */}
        <div
          className="rounded-lg overflow-hidden"
          style={{
            width: '354px',
            height: '90px',
            borderRadius: '10px',
            background: 'linear-gradient(to right, #4880C0, #1B589E)'
          }}
        >
          <div className="p-4 h-full flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#4887CF' }}
            >
              <img src={images.UsersThree} alt="Users" className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white mb-1" style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '10px',
                fontWeight: 274,
                fontStyle: 'normal',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}>Active Users</p>
              <h2 className="text-white" style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontWeight: 510,
                fontStyle: 'normal',
                fontSize: '30px',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}>{activeUsers}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMetricCards;

