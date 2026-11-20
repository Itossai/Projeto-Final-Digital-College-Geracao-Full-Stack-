const FilterGroup = ({
    title,
    inputType,
    options,
    selectedValues = [],
    onChange,
}) => {
    return (
        <fieldset className="border-none p-0 m-0 mt-4">
            <legend
                className="mb-3 p-0"
                style={{
                    color: "var(--dark-gray-2)",
                    fontSize: "14px",
                    fontWeight: "600",
                }}
            >
                {title}
            </legend>
            {options.map((option) => {
                const value = option.value ?? option.values ?? option.text;

                return (
                    <label
                        key={value}
                        className="flex align-items-center gap-2 mb-2"
                        style={{
                            color: "var(--dark-gray-2)",
                            fontSize: "14px",
                            cursor: "pointer",
                        }}
                    >
                        <input
                            className="flex-shrink-0 m-0"
                            type={inputType}
                            name={title}
                            value={value}
                            checked={selectedValues.includes(value)}
                            onChange={(event) =>
                                onChange?.(value, event.target.checked)
                            }
                            style={{
                                width: "22px",
                                height: "22px",
                                accentColor: "var(--primary)",
                            }}
                        />
                        {option.text}
                    </label>
                );
            })}
        </fieldset>
    );
};

export default FilterGroup;