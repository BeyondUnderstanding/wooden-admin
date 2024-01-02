interface GetDateTimeProps {
    startDate: Date;
    endDate: Date;
}

const addZeroBefore = (dateAtribut: number) => {
    return dateAtribut < 10 ? '0' + dateAtribut : dateAtribut;
};
export const getDateTime = ({ startDate, endDate }: GetDateTimeProps) => {
    return `
            ${addZeroBefore(startDate.getDate())}.
            ${addZeroBefore(startDate.getMonth())}.
            ${startDate.getFullYear()} 
            ${addZeroBefore(startDate.getHours())} :
            ${addZeroBefore(startDate.getMinutes())} -
            ${addZeroBefore(endDate.getHours())} :
            ${addZeroBefore(endDate.getMinutes())}
        `;
};
