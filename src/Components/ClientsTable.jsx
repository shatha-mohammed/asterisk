import { StatusBadge, ActionButtons } from "@/components/ui";

const ClientsTable = ({
  clients = [],
  isLoading = false,
  onEdit,
  onDelete,
}) => {
  if (isLoading)
    return (
      <div className="flex h-64 animate-pulse items-center justify-center text-slate-400">
        Loading...
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {clients?.length > 0 ? (
          clients.map((client) => (
            <div
              key={client.id}
              className="space-y-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF2FF] text-xs font-bold text-[#4F46E5]">
                    {client.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {client.name}
                    </h3>
                    <p className="text-[11px] text-slate-400">{client.email}</p>
                  </div>
                </div>
                <StatusBadge status={client.status || "Active"} />
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-slate-50 pt-2">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    Company
                  </p>
                  <p className="text-xs font-medium text-slate-600">
                    {client.company}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    Phone
                  </p>
                  <p className="text-xs font-bold text-slate-500">
                    {client.phone}
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <ActionButtons
                  onEdit={() => onEdit && onEdit(client.id)}
                  onDelete={() => onDelete && onDelete(client.id)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              No Clients Found
            </p>
          </div>
        )}
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm md:block">
        <table className="w-full text-left">
          <thead className="border-b border-slate-100 bg-[#F9FAFB]">
            <tr>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase">
                Client
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase">
                Company
              </th>
              <th className="px-6 py-4 text-right text-[11px] font-bold text-slate-400 uppercase">
                Phone
              </th>
              <th className="px-6 py-4 text-center text-[11px] font-bold text-slate-400 uppercase">
                Status
              </th>
              <th className="px-6 py-4 text-right text-[11px] font-bold text-slate-400 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {clients?.length > 0 ? (
              clients.map((client) => (
                <tr
                  key={client.id}
                  className="transition-colors hover:bg-slate-50/50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF2FF] text-[10px] font-bold text-[#4F46E5]">
                        {client.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">
                          {client.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {client.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {client.company}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-bold text-slate-500">
                    {client.phone}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={client.status || "Active"} />
                  </td>
                  <td className="px-6 py-4">
                    <ActionButtons
                      onEdit={() => onEdit && onEdit(client.id)}
                      onDelete={() => onDelete && onDelete(client.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-20 text-center text-xs font-black tracking-widest text-slate-300 uppercase"
                >
                  No Clients Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsTable;
