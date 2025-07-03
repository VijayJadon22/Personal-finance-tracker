
export const generateTokenAndSetCookies = async (user, res) => {
    const token = await user.generateToken(user._id);

    const options = {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
    }
    res.cookie("token", token, options);
}