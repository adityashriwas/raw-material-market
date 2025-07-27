import { Menu } from "lucide-react";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../features/api/authApi";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User log out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 bg-orange-50 fixed top-0 left-0 right-0 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center h-full px-4">
        <Link to="/">
          <h1 className="font-extrabold text-2xl">Sellium</h1>
        </Link>

        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="@user"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/all-products">All Products</Link>
                  </DropdownMenuItem>
                  {user?.role === "supplier" && (
                    <DropdownMenuItem asChild>
                      <Link to="/add-product">Add Product</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/signup")}>Signup</Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <Link to="/">
          <h1 className="font-extrabold text-2xl">Sellium</h1>
        </Link>
        <MobileNavbar user={user} />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user }) => {
  const navigate = useNavigate();
  const [logoutUser, { data, isSuccess }] = useLogoutMutation();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User log out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <>
      {user ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="rounded-full hover:bg-gray-200"
              variant="outline"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <SheetHeader className="flex flex-row items-center justify-between mt-4">
              <SheetTitle>
                <Link to="/">Sellium</Link>
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col space-y-4 mt-2">
              <SheetClose asChild>
                <Link to="/profile">My Profile</Link>
              </SheetClose>

              <SheetClose asChild>
                <Link to="/all-products">All Products</Link>
              </SheetClose>

              {user?.role === "supplier" && (
                <SheetClose asChild>
                  <Link to="/add-product">Add Product</Link>
                </SheetClose>
              )}

              <SheetClose asChild>
                <p onClick={logoutHandler} className="cursor-pointer">
                  Log out
                </p>
              </SheetClose>
            </nav>

            {user?.role === "supplier" && (
              <SheetFooter className="mt-4">
                <SheetClose asChild>
                  <Button onClick={() => navigate("/add-product")}>
                    Dashboard
                  </Button>
                </SheetClose>
              </SheetFooter>
            )}
          </SheetContent>
        </Sheet>
      ) : (
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button onClick={() => navigate("/signup")}>Signup</Button>
        </div>
      )}
    </>
  );
};
