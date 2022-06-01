export const FormatNumber = ({ number }) => {


    return new Intl.NumberFormat("ES-MX", {
        style: "currency",
        currency: "MXN"
    }).format(number)

}