import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/userAction";
import { Dropdown, Image } from "react-bootstrap";
import { FiShoppingCart, FiPackage, FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { MdRateReview } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import logo from "../../image/logo.avif";
import Search from "./Search";
import { Link } from "react-router-dom";

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = items.length;

  const handleLogout = () => {
    dispatch(logoutUser);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-4 py-3">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="text-xl font-extrabold text-emerald-600">
            MangalaShow
          </span>
        </Link>

        {/* Search + Cart */}
        <div className="flex flex-1 items-center gap-8 min-w-[200px] max-w-2xl">
          <div className="flex-1">
            <Search />
          </div>

          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-green-600 transition"
          >
            <FiShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* User Dropdown */}
        {isAuthenticated ? (
          <Dropdown className="d-inline">
            <Dropdown.Toggle
              as="div"
              id="dropdown-basic"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Image
                src={user.avatar ?? "/images/default_avatar.png"}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full object-cover border border-emerald-500"
              />
              <span className="font-medium text-sm text-gray-800">
                {user.firstname}
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="mt-2 rounded shadow min-w-[250px]">
              {user.role === "admin" ? (
                <>
                  <Dropdown.Item
                    onClick={() => navigate("/admin/dashboard")}
                    className="text-dark d-flex align-items-center gap-2"
                  >
                    <CgProfile size={18} /> Dashboard
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => navigate("/myprofile")}
                    className="text-dark d-flex align-items-center gap-2"
                  >
                    <CgProfile size={18} /> Manage My Account
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={handleLogout}
                    className="text-danger d-flex align-items-center gap-2"
                  >
                    <FiLogOut size={18} /> Logout
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item
                    onClick={() => navigate("/myprofile")}
                    className="text-dark d-flex align-items-center gap-2"
                  >
                    <CgProfile size={18} /> Manage My Account
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => navigate("/orders")}
                    className="text-dark d-flex align-items-center gap-2"
                  >
                    <FiPackage size={18} /> My Orders
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => navigate("/wishlist")}
                    className="text-dark d-flex align-items-center gap-2"
                  >
                    <AiOutlineHeart size={18} /> My Wishlist & Followed Stores
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => navigate("/reviews")}
                    className="text-dark d-flex align-items-center gap-2"
                  >
                    <MdRateReview size={18} /> My Reviews
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => navigate("/returns")}
                    className="text-dark d-flex align-items-center gap-2"
                  >
                    <BiArrowBack size={18} /> My Returns & Cancellations
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={handleLogout}
                    className="text-danger d-flex align-items-center gap-2"
                  >
                    <FiLogOut size={18} /> Logout
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link
            to="/login"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full transition duration-200"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
