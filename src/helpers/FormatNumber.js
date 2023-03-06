export const FormatNumber = ({ number, isPorcentaje = false }) => (

    !isPorcentaje ? (
        new Intl.NumberFormat("ES-MX", {
            style: "currency",
            currency: "MXN"
        }).format(Number(number))
    ) : (
        `${(number * 100).toFixed(2)}%`
    )

)






