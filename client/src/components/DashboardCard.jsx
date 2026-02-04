function DashboardCard({ title, value, subtitle }) {
    return (
        <div className="bg-gray-800 rounded-xl p-4 shadow-md">
            <div className="text-sm text-gray-400">{title}</div>
            <div className="text-2xl font bold mt-1">{value}</div>
            {subtitle && (
                <div className="text-xs text-gray-500 mt-1">
                    {subtitle}
                </div>
            )}
        </div>
    );
}

export default DashboardCard;