const Section = ({
    title,
    titleAlign = "left",
    link,
    children,
    className,
    titleStyle,
    style,
}) => {
    const alignment = titleAlign === "center" ? "center" : "left";
    const linkHref = link?.href ?? link?.to ?? link?.url;
    const linkText = link?.text ?? link?.label ?? link?.title;

    return (
        <section className={className} style={style}>
            {title && (
                <div className="flex align-items-center gap-3">
                    <h2
                        className="section-title flex-1 m-0"
                        style={{
                            color: "var(--dark-gray-2)",
                            fontSize: "24px",
                            textAlign: alignment,
                            ...titleStyle,
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
            )}

            {children}
        </section>
    );
};

export default Section;