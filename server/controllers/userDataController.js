const { fakerPL, fakerDE, fakerEN_US, fakerIT } = require("@faker-js/faker");
const ApiError = require("../error/ApiError");
const seedrandom = require("seedrandom");
const winston = require("winston");

class userDataController {
    generateRandomSeed(req, res) {
        const seed = fakerPL.seed();

        res.json({ seed: seed });
    }

    generateUsersData(req, res) {
        const { region, countUsers, errorCount, seed, page } = req.body;

        //winston.log("info", typeof (countUsers, errorCount, seed, page) === "number");

        if (
            typeof region !== "string" ||
            typeof (countUsers, errorCount, seed, page) !== "number"
        ) {
            return next(ApiError.badRequest("Invalid data"));
        }

        function createRandomUser() {
            const user = {
                userId: faker.string.uuid(),
                name: generateFullName(faker, 0),
                address: generateAddress(faker, 0),
                phoneNumber: generatePhoneNumber(faker, 0),
            };

            return getUserWithErrors(user);
        }

        function getFakerForRegion(region) {
            switch (region) {
                case "PL":
                    return fakerPL;
                case "EN":
                    return fakerEN_US;
                case "DE":
                    return fakerDE;
                case "IT":
                    return fakerIT;
                default:
                    console.log("Don't find this region");
                    return fakerEN_US;
            }
        }

        function getAlphabetRegion(region) {
            switch (region) {
                case "PL":
                    return "aąbcćdeęfghijklłmnńoóprsśtuwyzźżAĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻ";
                case ("EN", "IT"):
                    return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                case "DE":
                    return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜßäöü";
                default:
                    console.log("Don't find this region");
                    return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            }
        }

        function generateFullName(faker) {
            return faker.person.fullName();
        }

        function generateAddress(faker) {
            let address = "";

            address = `${faker.location.city()}, ${faker.location.streetAddress()}, Building ${faker.location.buildingNumber()}, Apartment ${faker.location.secondaryAddress()}`;

            address += `, ZIP Code ${faker.location.zipCode()}`;

            return address;
        }

        function generatePhoneNumber(faker) {
            return faker.phone.number();
        }

        function calculateErrors(count) {
            if (errorCount < 0) {
                return 0;
            }

            if (Number.isInteger(count)) {
                return count;
            }

            let integerPart = Math.floor(count);
            const errorProbability = count - integerPart;
            const randomNumber = Math.random();

            if (randomNumber <= errorProbability) {
                integerPart += 1;
            }

            return integerPart;
        }

        function getUserWithErrors(user) {
            let errors = calculateErrors(errorCount);
            if (errors === 0) {
                return user;
            }

            const totalCharacters =
                user.name.length + user.address.length + user.phoneNumber.length;

            const rng = seedrandom(`${seed}-${page}`);

            if (errors >= totalCharacters) {
                applyErrors(
                    user,
                    user.name.length,
                    user.address.length,
                    user.phoneNumber.length,
                    rng
                );
            } else {
                const nameErrors = Math.min(
                    Math.floor(errors * (user.name.length / totalCharacters)),
                    user.name.length
                );
                const addressErrors = Math.min(
                    Math.floor(errors * (user.address.length / totalCharacters)),
                    user.address.length
                );
                const phoneNumberErrors = Math.min(
                    errors - nameErrors - addressErrors,
                    user.phoneNumber.length
                );
                applyErrors(user, nameErrors, addressErrors, phoneNumberErrors, rng);
            }

            return user;
        }

        function applyErrors(user, nameErrors, addressErrors, phoneNumberErrors, rng) {
            user.name = applyRandomError(user.name, nameErrors, rng);
            user.address = applyRandomError(user.address, addressErrors, rng);
            user.phoneNumber = applyRandomError(user.phoneNumber, phoneNumberErrors, rng);
        }

        function applyRandomError(input, numErrors, rng) {
            let result = input;

            for (let i = 0; i < numErrors; i++) {
                const randomErrorType = Math.floor(rng() * 3);
                const randomIndex = Math.floor(rng() * result.length);

                switch (randomErrorType) {
                    case 0:
                        result = result.slice(0, randomIndex) + result.slice(randomIndex + 1);
                        break;
                    case 1:
                        const randomChar = generateRandomChar(getAlphabetRegion(region), rng);
                        result =
                            result.slice(0, randomIndex) + randomChar + result.slice(randomIndex);
                        break;
                    case 2:
                        if (randomIndex < result.length - 1) {
                            result =
                                result.slice(0, randomIndex) +
                                result.charAt(randomIndex + 1) +
                                result.charAt(randomIndex) +
                                result.slice(randomIndex + 2);
                        }
                        break;
                }
            }

            return result;
        }

        function generateRandomChar(alphabet, rng) {
            const randomIndex = Math.floor(rng() * alphabet.length);
            return alphabet[randomIndex];
        }

        const faker = getFakerForRegion(region);

        faker.seed(seed + page);

        const usersData = faker.helpers.multiple(createRandomUser, {
            count: countUsers,
        });

        return res.json({ usersData });
    }
}

module.exports = new userDataController();
