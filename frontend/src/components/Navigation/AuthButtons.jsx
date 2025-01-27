const AuthButtons = () => (
    <div className="flex items-center space-x-4">
      <Link to="/login" className="hover:text-green-200">
        Login
      </Link>
      <Link to="/register" className="bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-50">
        Register
      </Link>
    </div>
   );

export default AuthButtons;