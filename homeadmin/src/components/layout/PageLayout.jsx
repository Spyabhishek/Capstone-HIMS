export default function PageLayout({ children, title, headerContent }) {
  return (
    <div className="flex flex-col h-full p-6 space-y-6">
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {title}
        </h2>
        {headerContent}
      </div>
      
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
} 