function Sidebar({
  activeTab,
  setActiveTab,
  onLogout,
}) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "📊",
    },
    {
      id: "students",
      label: "Students",
      icon: "👥",
    },
    {
      id: "add-student",
      label: "Add Student",
      icon: "➕",
    },
    {
      id: "attendance",
      label: "Attendance",
      icon: "📅",
    },
    {
      id: "classes",
      label: "Classes",
      icon: "🏫",
    },
    {
      id: "fees",
      label: "Fees",
      icon: "💳",
    },
  ];

  return (
<aside
  className="bg-white border-end p-3 d-flex flex-column"
  style={{
    width: "240px",
    minWidth: "240px",
    height: "400px",
  }}
>


      <div>

        <div className="text-muted small fw-bold text-uppercase mb-3 px-2">
          Main Menu
        </div>

        <div className="list-group list-group-flush">

          {menuItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`list-group-item list-group-item-action d-flex align-items-center gap-2 rounded mb-1 border-0 py-2 px-3 fw-medium ${
                  isActive
                    ? "active bg-primary text-white"
                    : "text-dark"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <span>{item.icon}</span>

                <span>{item.label}</span>
              </button>
            );
          })}

        </div>

      </div>

      {/* Logout */}
      <div className="border-top pt-3 mt-4">

        <button
          type="button"
          className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 fw-medium"
          onClick={onLogout}
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
