export default function makeID(lengths) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz";
    var clength = characters.length;
    for (var i = 0; i < lengths; i++) {
        result += characters.charAt(Math.floor(Math.random() * clength));
    }

    return result;
}