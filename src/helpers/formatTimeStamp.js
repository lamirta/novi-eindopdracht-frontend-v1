export default function formatTimeStamp(timestamp) {

    if ( timestamp !== null ) {
        timestamp.toString();
        console.log(timestamp);

        let date = timestamp.slice(0, 10);
        let time = timestamp.slice(11, 19);

        console.log(date);
        console.log(time);

        return date + " om " + time;

        // return date + " om " + time;
    }

}
