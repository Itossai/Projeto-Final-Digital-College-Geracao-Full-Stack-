const FilterGroup = ({
    title,
    inputType,
    options,
    selectedValues = [],
    onChange,
}) => {
    return (
        <fieldset>
            <legend>{title}</legend>
            {options.map((option) => {
                const value = option.value ?? option.values ?? option.text;

                return (
                    <label key={value}>
                        <input
                            type={inputType}
                            name={title}
                            value={value}
                            checked={selectedValues.includes(value)}
                            onChange={(event) =>
                                onChange?.(value, event.target.checked)
                            }
                        />
                        {option.text}
                    </label>
                );
            })}
        </fieldset>
    );
};

export default FilterGroup;