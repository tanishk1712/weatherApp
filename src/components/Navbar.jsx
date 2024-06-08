import { Button, Center, Flex, Icon, Input, useToast, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import { useDispatch } from "react-redux";
import { getWeatherByCity, getWeatherByLocation } from "../redux/actions";
import { HiLocationMarker } from "react-icons/hi";

export const Navbar = () => {
    const [city, setCity] = useState("");
    const [currentDateTime, setCurrentDateTime] = useState(dayjs().format('MMMM D, YYYY h:mm:ss A'));
    const dispatch = useDispatch();
    const toast = useToast();
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue('#7AAFFF', '#2D3748');
    const buttonBg = useColorModeValue('#4765FF', '#4A5568');
    const hoverBg = useColorModeValue('#5e82f4', '#718096');
    const inputBg = useColorModeValue('white', '#1A202C');
    const inputPlaceholderColor = useColorModeValue('gray.500', 'gray.300');
    const textColor = useColorModeValue('white', 'gray.300');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(dayjs().format('MMMM D, YYYY h:mm:ss A'));
        }, 1000);

        return () => clearInterval(timer); // Cleanup the interval on component unmount
    }, []);

    const handleChnage = () => {
        dispatch(getWeatherByCity(city, toast));
    }

    const handleLocationData = () => {
        dispatch(getWeatherByLocation(toast));
    }

    return (
        <Flex p={'10px'} minH={'70px'} bg={bg} justifyContent={'center'} flexDirection={['column', 'row']} gap={['10px', '0px']}>
            <Center px={'10px'}>
                <Input
                    onKeyPress={({ key }) => { key === "Enter" ? handleChnage() : undefined }}
                    onInput={(e) => { setCity(e.target.value) }}
                    value={city}
                    borderRadius={'15px 0px 0px 15px'}
                    bg={inputBg}
                    _focus={{ border: 'none' }}
                    placeholder="City"
                    _placeholder={{ color: inputPlaceholderColor }}
                />
                <Button
                    onClick={handleChnage}
                    borderRadius={'0px 15px 15px 0px'}
                    color={textColor}
                    bg={buttonBg}
                    _hover={{ bg: hoverBg }}
                >
                    Search
                </Button>
            </Center>
            <Center px={'10px'}>
                <Button
                    bg={buttonBg}
                    _hover={{ bg: hoverBg }}
                    color={textColor}
                    w={'100%'}
                    borderRadius={'15px'}
                    leftIcon={<Icon w={'30px'} h={'30px'} as={HiLocationMarker} />}
                    onClick={handleLocationData}
                >
                    Your Location Weather
                </Button>
            </Center>
            <Center px={'10px'}>
                <Button
                    bg={buttonBg}
                    _hover={{ bg: hoverBg }}
                    color={textColor}
                    w={'100%'}
                    borderRadius={'15px'}
                >
                    {currentDateTime}
                </Button>
            </Center>
            <Center px={'10px'}>
                <Button
                    onClick={toggleColorMode}
                    bg={buttonBg}
                    _hover={{ bg: hoverBg }}
                    color={textColor}
                    w={'100%'}
                    borderRadius={'15px'}
                >
                  {colorMode === "light" ? "Dark" : "Light"} Mode
                </Button>
            </Center>
        </Flex>
    );
};
