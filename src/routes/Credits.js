import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import pkg from '../../package.json';

function Credits() {
    useEffect(() => {
        let start;
        let scroll;

        window.scroll(0, 0);

        start = setTimeout(() => {
            scroll = setInterval(() => {
                window.scroll(0, window.scrollY + 1);
            }, 1);
        }, 1000);

        return () => {
            clearTimeout(start);
            clearInterval(scroll);
        };
    }, []);

    return (
        <div className="credits">
            <Link to="/" className="close" />

            <h1>Credits</h1>

            <section>
                <h4>Made for</h4>
                <p>Wowie Jam 4.0</p>
            </section>

            <section>
                <h4>Based on the theme</h4>
                <p>Collaborate with AI</p>
            </section>

            <section>
                <h4>Programming</h4>
                <p>C1200</p>
            </section>

            <section>
                <h4>Images</h4>
                <p>ultimatearm via Flaticon</p>
                <p>Freepik via Flaticon</p>
                <p>Vectors Market via Flaticon</p>
                <p>Good Ware via Flaticon</p>
                <p>Maxim Basinski Premium via Flaticon</p>
                <p>Adib Sulthon via Flaticon</p>
            </section>

            <section>
                <h4>Music/SFX</h4>
                <p>F.M.Audio via Freesound</p>
            </section>

            <section>
                <p>"Overcast" Kevin MacLeod (incompetech.com)</p>
                <p>Licensed under Creative Commons: By Attribution 3.0</p>
                <p>http://creativecommons.org/licenses/by/3.0/</p>
            </section>

            <section>
                <p>"Newer Wave" Kevin MacLeod (incompetech.com)</p>
                <p>Licensed under Creative Commons: By Attribution 3.0</p>
                <p>http://creativecommons.org/licenses/by/3.0/</p>
            </section>

            <section>
                <p>"Voxel Revolution" Kevin MacLeod (incompetech.com)</p>
                <p>Licensed under Creative Commons: By Attribution 3.0</p>
                <p>http://creativecommons.org/licenses/by/3.0/</p>
            </section>

            <section>
                <h4>NPM Packages</h4>
                {Object.entries({
                    ...pkg.dependencies,
                    ...pkg.devDependencies,
                }).map((dep) => (
                    <p>
                        {dep[0]}@{dep[1]}
                    </p>
                ))}
            </section>

            <section>
                <h4>Special Thanks To</h4>
                <p>You</p>
            </section>

            <section>
                <h4>A</h4>
                <p>C1200 Games and Ultimate Media game</p>
            </section>

            <section>
                <p>Copyright © Ultimate Media 2022</p>
                <p>Licensed under the MIT Licence</p>
                <p>Code available at git.c1200.cf/AutoClaw</p>
            </section>
        </div>
    );
}

export default Credits;
