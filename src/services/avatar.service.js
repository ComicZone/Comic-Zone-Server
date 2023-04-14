// A list of avatar styles available on dicebear
const avatarStyles = [
    'adventurer',
    'adventurer-neutral',
    'avataaars',
    'avataaars-neutral',
    'big-ears',
    'big-ears-neutral',
    'big-smile',
    'bottts',
    'bottts-neutral',
    'croodles',
    'croodles-neutral',
    'fun-emoji',
    'icons',
    'identicon',
    'initials',
    'lorelei',
    'lorelei-neutral',
    'micah',
    'miniavs',
    'open-peeps',
    'personas',
    'pixel-art',
    'pixel-art-neutral',
    'shapes',
    'thumbs'
];
  
// Generates a random avatar style from the avatar styles array
const getRandomAvatarStyle = () => {
    const randomIndex = Math.floor(Math.random() * avatarStyles.length);
    const style = avatarStyles[randomIndex];
    return style;
}

// This generates a random avatar
const generateRandomAvatar = async (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const _email = email.trim();
    const isValidEmail = emailRegex.test(_email);
    if (!isValidEmail) throw new Error('Invalid email')

    const entropySource = () => Math.random().toString(36).substring(2,7);
    const replaceAt = `-${entropySource()}-`
    const replaceDot = `-${entropySource()}-`
    const seed = _email.replace('@', replaceAt).replace(/\./g, replaceDot);
    const randomAvatarStyle = getRandomAvatarStyle();

    if (!randomAvatarStyle || !avatarStyles.includes(randomAvatarStyle)) {
    // console.error('Invalid avatar style') // log this error to the console
    throw new Error('Something failed: ')
    }

    const avatarUrl = `https://api.dicebear.com/5.x/${randomAvatarStyle}/svg?seed=${seed}&size=200&radius=50`;
    return avatarUrl;
}

module.exports = generateRandomAvatar;