export default function formatTimeStamp(timestamp) {

    if ( timestamp !== null ) {
        timestamp.toString();

        let date = timestamp.slice(0, 10);
        let time = timestamp.slice(11, 19);

        return date + " om " + time;
    }
}
