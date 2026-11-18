const Section = ({ title, titleAlign = "left", link, children }) => {
    const alignment = titleAlign === "center" ? "center" : "left";
    const linkHref = link?.href ?? link?.to ?? link?.url;
    const linkText = link?.text ?? link?.label ?? link?.title;

    return (
        <section>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                }}
            >
                <h2
                    style={{
                        flex: 1,
                        margin: 0,
                        color: "var(--dark-gray-2)",
                        fontSize: "24px",
                        textAlign: alignment,
                    }}
                >
                    {title}
                </h2>

                {link && linkText && (
                    <a
                        href={linkHref}
                        style={{
                            color: "var(--primary)",
                            fontSize: "18px",
                        }}
                    >
                        {linkText}
                    </a>
                )}
            </div>

            {children}
        </section>
    );
};

export default Section;