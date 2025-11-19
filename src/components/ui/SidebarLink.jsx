import { NavLink } from "react-router-dom";

export default function SidebarLink({ to, label, Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 px-3 py-2 transition-colors text-sm",
          isActive
            ? "text-[#1A194D] dark:bg-slate-800 dark:text-slate-50 font-normal"
            : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/60 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/60",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <Icon className="w-8 h-8" />
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}
