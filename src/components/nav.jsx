import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"


export default function Nav(){
  return (
    <NavigationMenu className="m-5 text-center">
      <NavigationMenuList>
        <NavigationMenuItem>
          <a href="/SwordManager/#/">Home</a>
        </NavigationMenuItem>
        <NavigationMenuItem>|</NavigationMenuItem>
        <NavigationMenuItem>
          <a href="/#/leaderboard">Leaderboard</a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )

}