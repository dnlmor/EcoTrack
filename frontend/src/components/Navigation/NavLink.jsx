const NavLink = ({ to, label }) => (
    <Link 
      to={to}
      className="text-white hover:text-green-200 transition-colors"
    >
      {label}
    </Link>
   );

export default NavLink;