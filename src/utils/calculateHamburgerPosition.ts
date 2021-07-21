export const calculateHamburgerPosition = (innerWidth: number): number => {
    return Math.round(34 + (innerWidth / 7));
};