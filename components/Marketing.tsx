
import React from 'react';
import { AppView } from '../types';
import MarketingDashboard from './marketing/MarketingDashboard';
import CampaignBuilder from './marketing/CampaignBuilder';

interface MarketingProps {
    onNavigate: (view: AppView) => void;
    currentView: 'dashboard' | 'builder';
    onChangeView: (view: 'dashboard' | 'builder') => void;
}

const Marketing: React.FC<MarketingProps> = ({ onNavigate, currentView, onChangeView }) => {
    return (
        <div className="h-full">
            {currentView === 'dashboard' ? (
                <MarketingDashboard
                    onNavigate={onNavigate}
                    onNewCampaign={() => onChangeView('builder')}
                />
            ) : (
                <CampaignBuilder />
            )}

            {/* Temporary Floating Button Removed as now we have real navigation */}
        </div>
    );
};

export default Marketing;
