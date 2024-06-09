interface MenuItemProps {
    children: React.ReactNode,
    onClik: () => void
}
 
const MenuItem: React.FC<MenuItemProps> = ({
    children,
    onClik
}) => {
    return ( <div onClick={onClik} className="px-4 py-3
         hover:bg-neutral-100 transition"> {children}</div> );
}
 
export default MenuItem;