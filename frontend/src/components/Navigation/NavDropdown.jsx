const NavDropdown = ({ user, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
   
    const menuItems = [
      { to: '/dashboard', label: 'Dashboard' },
      { to: '/profile', label: 'Profile' },
      { to: '/settings', label: 'Settings' }
    ];
   
    return (
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 hover:text-green-200"
        >
          <span>{user.username}</span>
          <span>▼</span>
        </button>
   
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
            {menuItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className="block px-4 py-2 text-green-700 hover:bg-green-50"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    );
   };

export default NavDropdown;
   