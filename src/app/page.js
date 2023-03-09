"use client";
import { BiSearchAlt2 } from "react-icons/bi";
import Image from "next/image";
import { useState, useEffect } from "react";

import styles from "./page.module.scss";
import logo from "/public/logo.webp";
import Link from "next/link";

export default function Home() {
  const [characters, setCharacters] = useState(null);
  const [name, setName] = useState("");
  // const [quantity, setQuantity] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  useEffect(() => {
    const storageCharacters = localStorage.getItem("characters");
    const parsedCharacters = JSON.parse(storageCharacters);
    if (parsedCharacters) {
      setCharacters(parsedCharacters);
    }

    const storageName = localStorage.getItem("name");
    const parsedName = JSON.parse(storageName);
    if (parsedName) {
      setName(parsedName);
    }

    if (!parsedCharacters) {
      fetch("https://rickandmortyapi.com/api/character")
        .then((res) => res.json())
        .then((data) => {
          setCharacters(data.results);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    if (characters) {
      localStorage.setItem("characters", JSON.stringify(characters));
    }
  }, [characters]);

  useEffect(() => {
    localStorage.setItem("name", JSON.stringify(name));

    fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          setCharacters(null);
          return;
        }
        setCharacters(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [name]);

  function inputChange(evt) {
    const inputName = evt.target.name;
    if (inputName) {
      setName(evt.target.value);
    }
  }
  function onFormSubmit(evt) {
    evt.preventDefault();
    setName(name);
  }

  return (
    <div className="container">
      <div className={styles.main}>
        <Image
          priority
          className={styles.main_logo}
          src={logo}
          alt="logo rick & morty"
        />

        <form onSubmit={onFormSubmit}>
          <label className={styles.main_label}>
            <input
              value={name}
              onChange={inputChange}
              className={styles.main_input}
              placeholder="Filter by name..."
              name="name"
              type="text"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            />
            <BiSearchAlt2 className={styles.main_icon} />
          </label>
        </form>

        <ul className={styles.main_list}>
          {!characters ? (
            <>
              <h1>Please, clear input field and try again!</h1>
            </>
          ) : (
            characters
              .sort((x, y) => {
                return x.name.localeCompare(y.name);
              })
              .map((hero) => {
                return (
                  <li className={styles.main_item} key={hero.id}>
                    <Link href={"./"} className={styles.main_card}>
                      <div className={styles.main_wrap}>
                        <Image
                          fill
                          sizes="(max-width: 768px) 100vw,
              (max-width: 1000px) 50vw,
              33vw"
                          src={hero.image}
                          alt="Character Image"
                        />
                      </div>
                      <div className={styles.main_text}>
                        <p className={styles.main_name}>{hero.name}</p>
                        <p className={styles.main_species}>{hero.species}</p>
                      </div>
                    </Link>
                  </li>
                );
              })
          )}
        </ul>
      </div>
    </div>
  );
}
