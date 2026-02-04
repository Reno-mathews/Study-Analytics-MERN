function DashboardCard({ title, value, subtitle }) {
    return (
        <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="text-sm text-slate-500">{title}</div>
            <div className="text-3xl font-semibold mt-1">{value}</div>
            {subtitle && (
                <div className="text-xs text-slate-400 mt-1">
                    {subtitle}
                </div>
            )}
        </div>
    );
}

export default DashboardCard;