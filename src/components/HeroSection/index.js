import React, { useState, useEffect } from "react";
import HeroBgAnimation from "../HeroBgAnimation";
import {
  HeroContainer,
  HeroBg,
  HeroLeftContainer,
  Img,
  HeroRightContainer,
  HeroInnerContainer,
  TextLoop,
  Title,
  Span,
  SubTitle,
  ResumeButton,
} from "./HeroStyle";
import HeroImg from "../../images/HeroImage.jpg";
import Typewriter from "typewriter-effect";
import { Bio } from "../../data/constants";

const HeroSection = () => {
  const [bioData, setBioData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBioData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8787/api/bio/111316734788280692226"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setBioData(data);
      } catch (err) {
        console.error("Error fetching bio data:", err);
        // Fallback to static data if API fails
        setBioData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBioData();
  }, []);

  // Use fetched data if available, otherwise fallback to static Bio data
  const name = bioData?.name || Bio.name;
  const roles = bioData?.designations || Bio.roles;
  const description = bioData?.desc || Bio.description;
  const resumeUrl = bioData?.resumeUrl || Bio.resume;
  const profileImage = bioData?.profileImage || HeroImg;

  if (loading) {
    return (
      <div id="about">
        <HeroContainer>
          <HeroBg>
            <HeroBgAnimation />
          </HeroBg>
          <HeroInnerContainer>
            <HeroLeftContainer id="Left">
              <Title>Loading...</Title>
            </HeroLeftContainer>
          </HeroInnerContainer>
        </HeroContainer>
      </div>
    );
  }

  return (
    <div id="about">
      <HeroContainer>
        <HeroBg>
          <HeroBgAnimation />
        </HeroBg>
        <HeroInnerContainer>
          <HeroLeftContainer id="Left">
            <Title>
              Hi, I am <br /> {name}
            </Title>
            <TextLoop>
              I am a
              <Span>
                <Typewriter
                  options={{
                    strings: roles,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </Span>
            </TextLoop>
            <SubTitle>{description}</SubTitle>
            <ResumeButton href={resumeUrl} target="display">
              Check Resume
            </ResumeButton>
          </HeroLeftContainer>

          <HeroRightContainer id="Right">
            <Img src={profileImage} alt="hero-image" />
          </HeroRightContainer>
        </HeroInnerContainer>
      </HeroContainer>
    </div>
  );
};

export default HeroSection;
