import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export default function Nav() {
  return (
    <NavigationMenu className="m-5 text-center">
      <NavigationMenuList>
        <NavigationMenuItem>
          <a
            href="#"
            onClick={() => {
              window.location.hash = "#";
              window.location.reload();
            }}
          >
            Home
          </a>
        </NavigationMenuItem>
        <NavigationMenuItem>|</NavigationMenuItem>
        <NavigationMenuItem>
          <a
            href="#"
            onClick={() => {
              window.location.hash = "#leaderboard";
              window.location.reload();
            }}
          >
            Leaderboard
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
