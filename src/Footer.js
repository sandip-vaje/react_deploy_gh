const Footer = ({ itemCount }) => {
    const today = new Date();

    return (
        <footer>
            <p>{itemCount} List {itemCount === 1 ? "item" : "items"}</p>
            <p>Copyright &copy; {today.getFullYear()}</p>
        </footer>
    )
}

export default Footer