const Section = ({ title, titleAlign = "left", link, children }) => {
    const alignment = titleAlign === "center" ? "center" : "left";
    const linkHref = link?.href ?? link?.to ?? link?.url;
    const linkText = link?.text ?? link?.label ?? link?.title;

    return (
        <section>
            <div className="flex align-items-center gap-3">
                <h2
                    className="flex-1 m-0"
                    style={{
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