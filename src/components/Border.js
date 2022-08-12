function Border({ children, className }) {
    return (
        <div className={className} style={{ border: '1px solid #eee' }}>
            {children}
        </div>
    );
}

export default Border;
