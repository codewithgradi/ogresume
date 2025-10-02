type ItemPropType = {
    items : string[]
}

export default function ListComponent({ items }: ItemPropType) {
    return (
        <ul className="py-2 list-disc px-5">
            {items.map((item,index) => (
                <li key={index}>{ item}</li>
            ))}
        </ul>
    )
}