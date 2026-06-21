'use client';

import { useState } from 'react';
import { Activity, Scale, Compass, CheckCircle2 } from 'lucide-react';
import styles from './BMICalculator.module.css';

export default function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    const hMeters = parseFloat(height) / 100;
    const wKg = parseFloat(weight);

    if (hMeters > 0 && wKg > 0) {
      const bmi = parseFloat((wKg / (hMeters * hMeters)).toFixed(1));
      let category = '';
      let categoryClass = '';
      let percentage = 0;
      let advice = '';

      if (bmi < 18.5) {
        category = 'Underweight';
        categoryClass = styles.underweight;
        percentage = 25;
        advice = 'Your profile suggests nourishment needs. We prescribe building-focused Hatha sequences, pranayamas to increase appetite, combined with nutritious, protein-rich diets.';
      } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Optimal Weight';
        categoryClass = styles.optimal;
        percentage = 50;
        advice = 'Excellent physical conditioning! To maintain perfect metabolic homeostasis and spine flexibility, we highly recommend regular Vinyasa Flow, alternate nostril breathing, and a Sattvic diet.';
      } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        categoryClass = styles.overweight;
        percentage = 75;
        advice = 'Active metabolic acceleration recommended. We prescribe core-stimulating dynamic Power Yoga, metabolic-raising twists (Mandukasana), and a strict custom calorie-controlled diet.';
      } else {
        category = 'Obesity Range';
        categoryClass = styles.obese;
        percentage = 95;
        advice = 'Clinical restoration attention recommended. To protect joint health and safely reduce blood sugar, we prescribe slow clinical therapeutic yoga and targeted anti-inflammatory dietary plans.';
      }

      setResult({
        score: bmi,
        category,
        categoryClass,
        percentage,
        advice,
      });
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <Activity size={24} className={styles.activityIcon} />
        </div>
        <div>
          <h3 className={styles.title}>BMI & Physical Diagnostic Suite</h3>
          <p className={styles.subtitle}>Analyze your physical metrics and get a tailored clinical action plan.</p>
        </div>
      </div>

      <form onSubmit={calculateBMI} className={styles.form}>
        <div className={styles.inputGroupRow}>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Height (in cm)</label>
            <div className={styles.inputContainer}>
              <input
                type="number"
                placeholder="e.g. 170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min="100"
                max="250"
                required
                className={styles.input}
              />
              <span className={styles.unit}>cm</span>
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.label}>Weight (in kg)</label>
            <div className={styles.inputContainer}>
              <input
                type="number"
                placeholder="e.g. 68"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="30"
                max="200"
                required
                className={styles.input}
              />
              <span className={styles.unit}>kg</span>
            </div>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          <Scale size={18} />
          <span>Analyze Physical Health</span>
        </button>
      </form>

      {result && (
        <div className={`${styles.resultCard} ${styles.fadeIn}`}>
          <div className={styles.resultHeader}>
            <span className={styles.resultTitle}>Your Metric Score</span>
            <div className={styles.score}>{result.score}</div>
            <span className={`${styles.badge} ${result.categoryClass}`}>
              {result.category}
            </span>
          </div>

          {/* Glowing Progress Gauge */}
          <div className={styles.progressContainer}>
            <div className={styles.progressBarBg}>
              <div 
                className={`${styles.progressBar} ${result.categoryClass}`} 
                style={{ width: `${result.percentage}%` }}
              ></div>
            </div>
            <div className={styles.rangeLabels}>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
            </div>
          </div>

          <div className={styles.adviceBox}>
            <div className={styles.adviceTitle}>
              <CheckCircle2 size={16} className={styles.adviceIcon} />
              <span>Yogic Prescription</span>
            </div>
            <p className={styles.adviceText}>{result.advice}</p>
          </div>
        </div>
      )}
    </div>
  );
}
