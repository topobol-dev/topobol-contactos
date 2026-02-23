import { useState, useEffect } from 'react';
import type { Profile } from '../domain/Profile';
import { fetchAllProfiles } from '../data/ProfileRepository';

export const useProfile = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const loadProfile = async () => {
            setLoading(true);

            // Obtenemos todos los perfiles desde el repositorio
            const profiles = await fetchAllProfiles();

            // Lógica para obtener el slug de la URL
            const pathSlug = window.location.pathname.substring(1);

            if (!pathSlug) {
                setNotFound(true);
            } else {
                const found = profiles.find(p => p.slug === pathSlug);
                if (found) {
                    setProfile(found);
                } else {
                    setNotFound(true);
                }
            }
            setLoading(false);
        };

        loadProfile();
    }, []);

    return { profile, loading, notFound };
};
