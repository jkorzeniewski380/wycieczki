import { Box, Flex, Heading, Image, ListItem, OrderedList } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { isNil } from "ramda";
import { tripSelector, tripsLoadedSelector } from '../../redux/trips/selectors';
import { getBookRoute } from '../../routes';
import { useEffect } from 'react';
import { fetchTripRequest } from '../../redux/trips/actions';
import { TripInfoListWrapper } from './components/TripInfoListWrapper';
import { TripInfoListItem } from './components/TripInfoListItem';
import { TripNavigationLink } from './components/TripNavigationLink';
import { TripDescriptionText } from './components/TripDescriptionText';

export const Trip = () => {
    const { id } = useParams();
    const trip = useSelector(tripSelector)(id);
    const tripsLoaded = useSelector(tripsLoadedSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!tripsLoaded && isNil(trip)) {
            dispatch(fetchTripRequest(id))
        }
    }, [dispatch, id, trip, tripsLoaded]);

    if (isNil(trip)) {
        return tripsLoaded ? (
            <Flex w="100%" h="100%" align="center" justify="center">
                <Heading as="h1">
                    Nie znaleziono wycieczki
                </Heading>
            </Flex>
        ) : null;
    }

    const {
        id: pk, obrazek: image, obrazek_tekst: imageAlt,
        nazwa: title, opis: description, cena: price,
        data_poczatku: startDate, data_konca: endDate,
        liczba_dostepnych_miejsc: availableSpots
    } = trip.toObject();

    return (
        <Box as="section">
            <Image
                float="left"
                w="200px"
                h="150px"
                m="20px 20px 20px 0"
                objectFit="fill"
                src={image}
                alt={imageAlt}
            />
            <Heading as="h1">
                {title}
            </Heading>
            <TripDescriptionText>
                {description}
            </TripDescriptionText>
            <Heading as="h2">
                Nag??owek z tytu??em
            </Heading>
            <TripDescriptionText>
                Tu kolejny fragment tekstu. Mo??e si?? z sk??ada?? z kilku akapit??w.
            </TripDescriptionText>
            <Heading as="h2">
                Jeszcze jeden nag????wek
            </Heading>
            <TripDescriptionText>
                I kolejne informacje o wycieczce. Trzeba si?? wysili?? i wymy??li?? w??asne.
            </TripDescriptionText>
            <Heading as="h2">
                Istotne informacje
            </Heading>
            <TripInfoListWrapper>
                <TripInfoListItem>termin wycieczki: {startDate} - {endDate}</TripInfoListItem>
                <TripInfoListItem>temperatury na miejscu: takie w sam raz</TripInfoListItem>
                <TripInfoListItem>warto zabra??: troch?? ubra?? na zim??</TripInfoListItem>
                <TripInfoListItem>cena wycieczki to: {price}</TripInfoListItem>
                <TripInfoListItem>dost??pne miejsca: {availableSpots}</TripInfoListItem>
            </TripInfoListWrapper>
            <Heading as="h2">
            Program wycieczki
            </Heading>
            <OrderedList my="16px">
                <ListItem>Odwiedziny na miejscu</ListItem>
                <ListItem>Obiad</ListItem>
                <ListItem>Wsp??lna wyprawa</ListItem>
            </OrderedList>
            <Flex
                as="section"
                justify="space-between"
                m="10px 0"
            >
                <TripNavigationLink to="/">
                    Powr??t
                </TripNavigationLink>
                <TripNavigationLink to={getBookRoute(pk)}>
                    Zarezerwuj
                </TripNavigationLink>
            </Flex>
        </Box>
    );
};
