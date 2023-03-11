"use client";
import { Oval } from "react-loader-spinner";
import { BiLeftArrowAlt } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./page.module.scss";

export default function CharactersId() {
  const router = usePathname();
  const [character, setCharacter] = useState(null);
  const id = router.slice(12, router.length);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      <div className={styles.hero}>
        {character ? (
          <div className={styles.hero_block}>
            <Link href="/" className={styles.hero_link}>
              <BiLeftArrowAlt className={styles.hero_icon} />
              GO BACK
            </Link>
            <div className={styles.hero_wrap}>
              <Image
                priority
                fill
                sizes="(max-width: 768px) 100vw,
              (max-width: 1000px) 50vw,
              33vw"
                className={styles.hero_img}
                src={character.image}
                alt="Hero image"
              />
            </div>
            <h1 className={styles.hero_name}>{character.name}</h1>
            <div className={styles.hero_info}>
              <p>Informations</p>
            </div>
            <ul className={styles.hero_list}>
              <li className={styles.hero_item}>
                <p className={styles.hero_title}>Gender</p>
                <p className={styles.hero_descr}>
                  {character.gender ? character.gender : "unknown"}
                </p>
              </li>
              <li className={styles.hero_item}>
                <p className={styles.hero_title}>Status</p>
                <p className={styles.hero_descr}>
                  {character.status ? character.status : "unknown"}
                </p>
              </li>
              <li className={styles.hero_item}>
                <p className={styles.hero_title}>Species</p>
                <p className={styles.hero_descr}>
                  {character.species ? character.species : "unknown"}
                </p>
              </li>
              <li className={styles.hero_item}>
                <p className={styles.hero_title}>Origin</p>
                <p className={styles.hero_descr}>
                  {character.origin.name ? character.origin.name : "unknown"}
                </p>
              </li>
              <li className={styles.hero_item}>
                <p className={styles.hero_title}>Type</p>
                <p className={styles.hero_descr}>
                  {character.type ? character.type : "unknown"}
                </p>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Oval
              height={80}
              width={80}
              color="#000"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#464646"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </>
        )}
      </div>
    </div>
  );
}
