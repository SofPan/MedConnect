import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PatientsList from "../PatientsList/PatientsList";
import BoxWrapper from "../GeneralComponents/BoxWrapper";
import PatientScheduler from "../Scheduling/PatientScheduler";
import TabContent from "./TabContent";
import UserInformation from "./UserInformation";

const ProfileBody = (props) => {
  const {
    isClinic,
    userProfile, 
    profileComponentLeft,
    profileComponentRight,
    activeTab,
  } = props;

  const tabVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  return (
    <article className={`profile-main ${isClinic ? "clinic-profile" : "patient-profile"}`}>
      <AnimatePresence mode="wait">
        {activeTab === 0 && (
          <motion.div
            key="tab-0"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={tabVariants}
            transition={{ duration: 0.3 }}
          >
            <TabContent value={activeTab} index={0}>
              <BoxWrapper type="profileLeft">
                <UserInformation userProfile={userProfile} />
                {profileComponentLeft}
              </BoxWrapper>
              <BoxWrapper type="profileRight">
                {profileComponentRight}
              </BoxWrapper>
            </TabContent>
          </motion.div>
        )}
        {activeTab === 1 && (
          <motion.div
            key="tab-1"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={tabVariants}
            transition={{ duration: 0.3 }}
          >
            <TabContent value={activeTab} index={1}>
              <PatientScheduler />
            </TabContent>
          </motion.div>
        )}
        {activeTab === 2 && (
        <motion.div
          key="tab-2"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={tabVariants}
          transition={{ duration: 0.3 }}
        >
          <TabContent value={activeTab} index={2}>
            <PatientsList />
          </TabContent>
        </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export default ProfileBody;
