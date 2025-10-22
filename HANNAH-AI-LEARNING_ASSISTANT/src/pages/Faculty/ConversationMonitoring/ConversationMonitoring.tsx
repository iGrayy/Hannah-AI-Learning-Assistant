import ConversationHeader from './ConversationHeader';
import ConversationFilter from './ConversationFilter';
import ConversationList from './ConversationList';
import ConversationDetailModal from './ConversationDetailModal';
import { useConversationManagement } from './useConversationManagement';

const ConversationMonitoring = () => {
  const {
    conversations,
    courses,
    selectedConversation,
    filters,
    totalCount,
    pendingCount,
    handleViewConversation,
    handleCloseDetail,
    handleStatusChange,
    handleFilterChange,
    handleResetFilters
  } = useConversationManagement();

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <ConversationHeader 
            totalCount={totalCount}
            pendingCount={pendingCount}
          />

          {/* Filters Section */}
          <ConversationFilter
            courses={courses}
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />

          {/* Conversation List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <ConversationList
              conversations={conversations}
              onView={handleViewConversation}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
      </div>

      {/* Conversation Detail Modal */}
      <ConversationDetailModal
        conversation={selectedConversation}
        onClose={handleCloseDetail}
        onStatusChange={handleStatusChange}
      />
    </>
  );
};

export default ConversationMonitoring;
