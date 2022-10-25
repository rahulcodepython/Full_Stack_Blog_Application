export default function parseddate(date) {

    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return (
        <span>{month[Number(date.split('-')[1]) - 1]} {date.split('-')[2]}, {date.split('-')[0]}</span>
    )
}
