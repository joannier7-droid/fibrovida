

          

  




 



 

  return (
    <div style={s.app}>
      <nav style={s.nav}>
        <div style={s.navTitle}>🌻 FIBROVIDA 🌻</div>
        <div style={s.navTabs}>
          {TABS.map(t => (
            <button key={t.id} style={s.tab(tab === t.id)} onClick={() => setTab(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </nav>

      {/* HOME */}
      {tab === "home" && (
        <div style={s.section}>
          <div style={{ ...s.cardGrad, textAlign: "center" }}>
            <Sunflower />
            <h1 style={{ ...s.h1, color: "#fff", fontSize: 20, marginBottom: 8 }}>Tu dolor es real, y no estás sola 💜</h1>
            <p style={{ ...s.p, color: "rgba(255,255,255,0.88)", fontSize: 13 }}>Esta es tu app de compañía, guía y descanso. Aquí encontrarás apoyo para cada día.</p>
          </div>
          <div style={{ ...s.card, background: palette.beige }}>
            <h2 style={s.h2}>¿Qué es la fibromialgia?</h2>
            <p style={s.p}>La fibromialgia es una condición real del sistema nervioso central que causa dolor crónico generalizado, fatiga profunda y sensibilidad aumentada. <strong>No es imaginación. No es debilidad.</strong> Es una condición médica reconocida que afecta a millones de mujeres.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
            {[
              { icon: "📊", label: "Registrar síntomas", target: "tracker" },
              { icon: "💡", label: "Guía de crisis", target: "guide" },
              { icon: "🗓️", label: "Mis citas", target: "citas" },
              { icon: "💊", label: "Medicamentos", target: "meds" },
              { icon: "💧", label: "Hidratación", target: "agua" },
              { icon: "📔", label: "Diario", target: "diario" },
              { icon: "🕊️", label: "Mi fe", target: "fe" },
              { icon: "🔗", label: "Recursos", target: "recursos" },
              { icon: "📅", label: "Plan 7 días", target: "plan" },
            ].map(btn => (
              <button key={btn.target} onClick={() => setTab(btn.target)} style={{ background: palette.card, border: `1.5px solid ${palette.lavender}`, borderRadius: 14, padding: "16px 8px", cursor: "pointer", textAlign: "center" }}>
                <div style={{ fontSize: 24 }}>{btn.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: palette.text, marginTop: 4 }}>{btn.label}</div>
              </button>
            ))}
          </div>
          <CTACard />
        </div>
      )}

      {/* TRACKER */}
      {tab === "tracker" && (
        <div style={s.section}>
          <h1 style={s.h1}>Registro de síntomas</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Escucha a tu cuerpo. Registrar te ayuda a entender tus patrones.</p>
          <div style={s.card}>
            <h2 style={{ ...s.h2, marginBottom: 16 }}>¿Cómo estás hoy?</h2>
            <SliderRow label="Nivel de dolor" value={pain} onChange={setPain} />
            <SliderRow label="Nivel de fatiga" value={fatigue} onChange={setFatigue} />
            <hr style={s.divider} />
            <MoodSelector value={mood} onChange={setMood} />
            <hr style={s.divider} />
            <label style={{ fontSize: 13, color: palette.textMuted }}>Nota opcional</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="¿Algo especial hoy?" rows={2} style={{ ...s.input, marginTop: 6, resize: "none" }} />
            <button style={s.btn} onClick={saveLog}>{saved ? "✓ Guardado" : "Guardar registro"}</button>
          </div>
          {logs.length > 0 && (
            <div style={s.card}>
              <h2 style={s.h2}>Tu historial reciente</h2>
              <BarChart logs={logs} />
              <hr style={s.divider} />
              <div style={{ maxHeight: 200, overflowY: "auto" }}>
                {[...logs].reverse().slice(0,5).map((log,i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i<4 ? `1px solid ${palette.purpleLight}` : "none" }}>
                    <span style={{ fontSize: 13, color: palette.textMuted }}>{log.date}</span>
                    <div style={{ display: "flex", gap: 6 }}>
                      <span style={s.tag}>Dolor {log.pain}</span>
                      <span style={{ ...s.tag, background: "#F0EBF8" }}>Fatiga {log.fatigue}</span>
                      <span style={{ fontSize: 18 }}>{moodEmojis[log.mood]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* GUIDE */}
      {tab === "guide" && (
        <div style={s.section}>
          <h1 style={s.h1}>Guía de apoyo diario</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Para los días difíciles y los momentos de crisis.</p>
          <div style={{ ...s.card, borderLeft: "4px solid #D4547E", borderRadius: 18 }}>
            <h2 style={{ ...s.h2, color: "#993556" }}>🚨 Durante una crisis</h2>
            {[["🛌","Para. Descansa sin culpa","Tu cuerpo pide pausa. Eso está bien."],["❄️🔥","Aplica calor suave","Una bolsa de agua caliente en las zonas de dolor puede aliviar la tensión muscular."],["📵","Reduce estimulación","Bajar las luces, silenciar el teléfono y alejarte del ruido ayuda a calmar el sistema nervioso."],["💧","Hidrátate despacio","Pequeños sorbos de agua tibia. El cuerpo agradece la hidratación constante."],["🤍","No te exijas","Una crisis no es un fracaso. Es señal de que tu cuerpo necesita más amor."]].map(([icon,title,desc]) => (
              <div key={title} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: `1px solid ${palette.purpleLight}` }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: palette.text }}>{title}</div>
                  <div style={{ fontSize: 13, color: palette.textMuted, lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={s.card}>
            <h2 style={s.h2}>💆‍♀️ Tips para el día a día</h2>
            {["Descansa sin culpa — el descanso ES productividad","Reduce actividades cuando sientas señales tempranas","Usa calor terapéutico en cuello, hombros y espalda","Estira suavemente al despertar (5 minutos son suficientes)","Mantente hidratada durante todo el día","Comunica tus límites sin disculparte por ellos","Escribe cómo te sientes — libera la carga emocional"].map(tip => (
              <div key={tip} style={{ display: "flex", gap: 8, padding: "7px 0", borderBottom: `1px solid ${palette.purpleLight}` }}>
                <span style={{ color: palette.purple, fontWeight: 700 }}>✔️</span>
                <span style={{ fontSize: 13, color: palette.textMuted, lineHeight: 1.6 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDU */}
      {tab === "edu" && (
        <div style={s.section}>
          <h1 style={s.h1}>Educación sobre fibromialgia</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Entender tu condición es parte de sanar.</p>
          <div style={s.card}>
            <h2 style={s.h2}>🧠 ¿Qué está pasando en tu cuerpo?</h2>
            <p style={s.p}>La fibromialgia ocurre cuando el sistema nervioso central amplifica las señales de dolor. Es como si el "volumen del dolor" estuviera demasiado alto. No es daño en los tejidos, sino una hipersensibilización del sistema nervioso.</p>
          </div>
          <div style={s.card}>
            <h2 style={s.h2}>📋 Síntomas comunes</h2>
            {[["🔴","Dolor crónico generalizado","Dolor difuso en músculos y articulaciones, frecuentemente en todo el cuerpo"],["🧠","Niebla mental (brain fog)","Dificultad para concentrarse, recordar cosas o pensar con claridad"],["😴","Fatiga profunda","Cansancio que no mejora con el sueño, incluso después de descansar"],["⚡","Sensibilidad aumentada","Mayor sensibilidad al tacto, la luz, el ruido, los olores o la temperatura"],["😴","Sueño no reparador","Dormir sin sentir descanso, despertarse agotada"],["💙","Síntomas emocionales","Ansiedad, tristeza, irritabilidad relacionados con el dolor crónico"]].map(([icon,title,desc]) => (
              <div key={title} style={{ display: "flex", gap: 10, padding: "9px 0", borderBottom: `1px solid ${palette.purpleLight}` }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: palette.text }}>{title}</div>
                  <div style={{ fontSize: 12, color: palette.textMuted }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={s.card}>
            <h2 style={s.h2}>⚠️ Posibles desencadenantes</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Estrés emocional","Mal sueño","Sobreactividad","Cambios climáticos","Infecciones","Cambios hormonales","Posturas sostenidas","Esfuerzo físico excesivo"].map(t => (
                <span key={t} style={s.tag}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CARE */}
      {tab === "care" && (
        <div style={s.section}>
          <h1 style={s.h1}>Rutina de autocuidado 🌻</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Una rutina suave de 5–10 minutos para nutrir tu cuerpo y tu mente.</p>
          <div style={{ ...s.card, background: palette.purpleLight }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <h2 style={{ ...s.h2, margin: 0, color: palette.purpleDark }}>Paso {routineStep+1} de {routineSteps.length}</h2>
              <span style={{ fontSize: 11, color: palette.purple, fontWeight: 600 }}>{Math.round(((routineStep+1)/routineSteps.length)*100)}%</span>
            </div>
            <div style={{ height: 4, background: palette.lavender, borderRadius: 4, marginBottom: 16 }}>
              <div style={{ height: 4, background: palette.purple, borderRadius: 4, width: `${((routineStep+1)/routineSteps.length)*100}%`, transition: "width 0.4s" }} />
            </div>
            <div style={{ textAlign: "center", padding: "10px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 10 }}>{routineSteps[routineStep].icon}</div>
              <h3 style={{ ...s.h3, fontSize: 18, color: palette.purpleDark }}>{routineSteps[routineStep].title}</h3>
              <p style={{ ...s.p, fontSize: 14, color: palette.textMuted, marginTop: 8 }}>{routineSteps[routineStep].desc}</p>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button style={{ ...s.btnOutline, flex: 1, marginTop: 0, opacity: routineStep===0 ? 0.4 : 1 }} onClick={() => setRoutineStep(x => Math.max(0,x-1))} disabled={routineStep===0}>← Anterior</button>
              {routineStep < routineSteps.length-1
                ? <button style={{ ...s.btn, flex: 1, marginTop: 0 }} onClick={() => setRoutineStep(x => x+1)}>Siguiente →</button>
                : <button style={{ ...s.btn, flex: 1, marginTop: 0, background: "#6A4DA8" }} onClick={() => setRoutineStep(0)}>🌻 Reiniciar</button>
              }
            </div>
          </div>
        </div>
      )}

      {/* MENTAL HEALTH */}
      {tab === "mental" && (
        <div style={s.section}>
          <h1 style={s.h1}>Salud emocional 🧠</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Cuida tu mente y corazón. Tu bienestar emocional es tan importante como el físico.</p>
          <div style={{ ...s.cardGrad, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 6 }}>🫀</div>
            <p style={{ color: "#fff", fontSize: 15, fontWeight: 500, lineHeight: 1.6, margin: 0 }}>El dolor emocional y el físico comparten los mismos caminos en el cerebro. Cuidar tu mente alivia tu cuerpo.</p>
          </div>
          {mentalSections.map(sec => (
            <div key={sec.title} style={s.card}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{sec.icon}</span>
                <div>
                  <h3 style={s.h3}>{sec.title}</h3>
                  <p style={s.p}>{sec.content}</p>
                </div>
              </div>
            </div>
          ))}
          <div style={{ ...s.card, background: palette.beige }}>
            <h2 style={s.h2}>🌿 Cuándo buscar ayuda profesional</h2>
            <p style={s.p}>Si sientes tristeza profunda, ansiedad constante o pensamientos negativos frecuentes, hablar con un psicólogo especializado en dolor crónico puede cambiar tu vida. Pedir ayuda es un acto de valentía, no de debilidad.</p>
            <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Terapia cognitivo-conductual","Mindfulness","Terapia de aceptación","Grupos de apoyo"].map(t => <span key={t} style={s.tag}>{t}</span>)}
            </div>
          </div>
        </div>
      )}

      {/* PLAN 7 DIAS */}
      {tab === "plan" && (
        <div style={s.section}>
          <h1 style={s.h1}>Plan de acción 7 días 📅</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Un plan paso a paso, gentil y realista, diseñado para tu ritmo.</p>
          <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 14, paddingBottom: 4, scrollbarWidth: "none" }}>
            {plan7dias.map((d, i) => (
              <button key={i} onClick={() => setPlanDay(i)} style={{ flexShrink: 0, background: planDay===i ? palette.purple : palette.card, color: planDay===i ? "#fff" : palette.textMuted, border: `1.5px solid ${planDay===i ? palette.purple : palette.lavender}`, borderRadius: 12, padding: "8px 12px", cursor: "pointer", textAlign: "center", minWidth: 52 }}>
                <div style={{ fontSize: 11, fontWeight: 600 }}>Día</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{i+1}</div>
                {dayProgress(i) === 100 && <div style={{ fontSize: 10 }}>✓</div>}
              </button>
            ))}
          </div>
          {(() => {
            const day = plan7dias[planDay];
            const prog = dayProgress(planDay);
            return (
              <div>
                <div style={{ ...s.card, borderLeft: `4px solid ${day.color}`, borderRadius: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: palette.textMuted, fontWeight: 600 }}>DÍA {planDay+1}</span>
                    <span style={{ fontSize: 12, color: palette.purple, fontWeight: 600 }}>{prog}% completado</span>
                  </div>
                  <h2 style={{ ...s.h2, color: day.color }}>{day.titulo}</h2>
                  <div style={{ height: 4, background: palette.purpleLight, borderRadius: 4, marginBottom: 14 }}>
                    <div style={{ height: 4, background: day.color, borderRadius: 4, width: `${prog}%`, transition: "width 0.4s" }} />
                  </div>
                  {day.pasos.map((paso, i) => {
                    const done = !!completedSteps[`${planDay}-${i}`];
                    return (
                      <div key={i} onClick={() => toggleStep(planDay, i)} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: `1px solid ${palette.purpleLight}`, cursor: "pointer", alignItems: "flex-start" }}>
                        <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${done ? day.color : palette.lavender}`, background: done ? day.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          {done && <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>✓</span>}
                        </div>
                        <span style={{ fontSize: 14, color: done ? palette.textMuted : palette.text, textDecoration: done ? "line-through" : "none", lineHeight: 1.5 }}>{paso}</span>
                      </div>
                    );
                  })}
                  <div style={{ background: palette.purpleLight, borderRadius: 12, padding: "10px 14px", marginTop: 12 }}>
                    <span style={{ fontSize: 12, color: palette.purpleDark, fontStyle: "italic" }}>💜 {day.tip}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ ...s.btnOutline, flex: 1, opacity: planDay===0 ? 0.4 : 1 }} onClick={() => setPlanDay(d => Math.max(0,d-1))} disabled={planDay===0}>← Día anterior</button>
                  {planDay < 6
                    ? <button style={{ ...s.btn, flex: 1 }} onClick={() => setPlanDay(d => Math.min(6,d+1))}>Día siguiente →</button>
                    : <button style={{ ...s.btn, flex: 1, background: "#6A4DA8" }} onClick={() => setPlanDay(0)}>🌻 Reiniciar plan</button>
                  }
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* SOUL */}
      {tab === "soul" && (
        <div style={s.section}>
          <h1 style={s.h1}>Apoyo emocional 💜</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Porque tu mente también necesita cuidado.</p>
          <div style={{ ...s.cardGrad, textAlign: "center", minHeight: 110, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>💜</div>
            <p style={{ fontSize: 16, fontWeight: 500, color: "#fff", lineHeight: 1.6, margin: 0 }}>"{affirmations[affIdx]}"</p>
          </div>
          <div style={s.card}>
            <h2 style={s.h2}>🌟 Afirmaciones para ti</h2>
            {affirmations.map((aff,i) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: `1px solid ${palette.purpleLight}`, display: "flex", gap: 10 }}>
                <span style={{ color: palette.purple }}>💜</span>
                <span style={{ fontSize: 14, color: palette.textMuted, lineHeight: 1.6 }}>{aff}</span>
              </div>
            ))}
          </div>
          <div style={{ ...s.card, background: palette.beige }}>
            <h2 style={s.h2}>🤝 Recuerda</h2>
            <p style={s.p}>Vivir con dolor crónico es agotador, y a veces incomprendido. Pero no estás sola. Millones de mujeres en el mundo comparten tu experiencia.</p>
            <p style={{ ...s.p, marginTop: 8 }}>Si sientes que necesitas apoyo profesional, hablar con un psicólogo especializado en dolor crónico puede ser muy beneficioso. <strong>Pedir ayuda es un acto de valentía.</strong></p>
          </div>
          <CTACard />
        </div>
      )}

      {/* ── CITAS ─────────────────────────────────────────────────────────── */}
      {tab === "citas" && (
        <div style={s.section}>
          <h1 style={s.h1}>Mis citas médicas 🗓️</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Organiza tus consultas y nunca olvides una cita.</p>

          <div style={s.card}>
            <MiniCalendar events={events} currentCal={currentCal} onChangeMonth={d => setCurrentCal(prev => new Date(prev.getFullYear(), prev.getMonth() + d, 1))} />
          </div>

          <div style={{ fontSize: 13, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase", letterSpacing: 0.5, margin: "4px 0 8px" }}>Próximas citas</div>
          {events.length === 0 && <p style={{ ...s.p, textAlign: "center", padding: 16 }}>No tienes citas guardadas aún.</p>}
          {[...events].sort((a,b) => a.date.localeCompare(b.date)).map(ev => {
            const d = new Date(ev.date + "T12:00:00");
            const label = d.toLocaleDateString("es-MX", { day: "numeric", month: "long" });
            return (
              <div key={ev.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12, background: palette.card, border: `1px solid ${palette.purpleLight}`, marginBottom: 8, boxShadow: `0 1px 6px ${palette.shadow}` }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: palette.ciruela, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: palette.text }}>{ev.name}</div>
                  <div style={{ fontSize: 12, color: palette.textMuted }}>{label} · {ev.hora}{ev.nota ? ` · ${ev.nota}` : ""}</div>
                </div>
                <button onClick={() => setEvents(prev => prev.filter(e => e.id !== ev.id))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: palette.textMuted, padding: "2px 6px", borderRadius: 6 }}>✕</button>
              </div>
            );
          })}

          <div style={{ ...s.card, marginTop: 8 }}>
            <h2 style={s.h2}>Agregar cita</h2>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, color: palette.textMuted, fontWeight: 600, display: "block", marginBottom: 4 }}>Médico o tipo de cita</label>
              <input style={s.input} value={citaNombre} onChange={e => setCitaNombre(e.target.value)} placeholder="Ej: Reumatóloga Dra. López" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <div>
                <label style={{ fontSize: 12, color: palette.textMuted, fontWeight: 600, display: "block", marginBottom: 4 }}>Fecha</label>
                <input type="date" style={s.input} value={citaFecha} onChange={e => setCitaFecha(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: palette.textMuted, fontWeight: 600, display: "block", marginBottom: 4 }}>Hora</label>
                <input type="time" style={s.input} value={citaHora} onChange={e => setCitaHora(e.target.value)} />
              </div>
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, color: palette.textMuted, fontWeight: 600, display: "block", marginBottom: 4 }}>Nota (opcional)</label>
              <input style={s.input} value={citaNota} onChange={e => setCitaNota(e.target.value)} placeholder="Ej: Llevar estudios anteriores" />
            </div>
            <button style={s.btnCiruela} onClick={addCita}>Guardar cita</button>
          </div>
        </div>
      )}

      {/* ── MEDICAMENTOS ──────────────────────────────────────────────────── */}
      {tab === "meds" && (
        <div style={s.section}>
          <h1 style={s.h1}>Mis medicamentos 💊</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Registra tus medicamentos y visualiza tus horarios del día.</p>

          {meds.length === 0 && <p style={{ ...s.p, textAlign: "center", padding: 16 }}>No tienes medicamentos guardados.</p>}
          {meds.map(med => {
            const times = calcTimes(med.hora, med.freq);
            return (
              <div key={med.id} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px", borderRadius: 14, background: palette.card, border: `1px solid ${palette.purpleLight}`, marginBottom: 10, boxShadow: `0 1px 6px ${palette.shadow}` }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: palette.purpleLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>💊</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: palette.text }}>{med.name}</div>
                  <div style={{ fontSize: 12, color: palette.textMuted, marginBottom: 6 }}>{med.freq}x al día{med.nota ? ` · ${med.nota}` : ""}</div>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {times.map(t => (
                      <span key={t} style={{ fontSize: 11, background: palette.purpleLight, color: palette.purpleDark, padding: "2px 9px", borderRadius: 10, fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => setMeds(prev => prev.filter(m => m.id !== med.id))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: palette.textMuted, padding: "2px 4px" }}>✕</button>
              </div>
            );
          })}

          <div style={s.card}>
            <h2 style={s.h2}>Agregar medicamento</h2>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, color: palette.textMuted, fontWeight: 600, display: "block", marginBottom: 4 }}>Nombre del medicamento</label>
              <input style={s.input} value={medNombre} onChange={e => setMedNombre(e.target.value)} placeholder="Ej: Pregabalina 75mg" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <div>
                <label style={{ fontSize: 12, color: palette.textMuted, fontWeight: 600, display: "block", marginBottom: 4 }}>Veces al día</label>
                <select style={s.input} value={medFreq} onChange={e => setMedFreq(Number(e.target.value))}>
                  <option value={1}>1 vez</option>
                  <option value={2}>2 veces</option>
                  <option value={3}>3 veces</option>
                  <option value={4}>4 veces</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, color: palette.textMuted, fontWeight: 600, display: "block", marginBottom: 4 }}>Primera toma</label>
                <input type="time" style={s.input} value={medHora} onChange={e => setMedHora(e.target.value)} />
              </div>
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, color: palette.textMuted, fontWeight: 600, display: "block", marginBottom: 4 }}>Instrucción (opcional)</label>
              <input style={s.input} value={medNota} onChange={e => setMedNota(e.target.value)} placeholder="Ej: Con comida" />
            </div>
            <button style={{ ...s.btn, background: palette.purpleDark }} onClick={addMed}>Guardar medicamento</button>
          </div>
        </div>
      )}

      {/* ── HIDRATACIÓN ───────────────────────────────────────────────────── */}
      {tab === "agua" && (
        <div style={s.section}>
          <h1 style={s.h1}>Mi hidratación 💧</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Mantenerse hidratada ayuda a reducir la fatiga y el dolor muscular.</p>

          <div style={{ ...s.card, textAlign: "center" }}>
            <h2 style={{ ...s.h2, marginBottom: 16 }}>Vasos de agua hoy</h2>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <div style={{ position: "relative", width: 140, height: 140 }}>
                <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="70" cy="70" r="52" fill="none" stroke={palette.purpleLight} strokeWidth="12" />
                  <circle cx="70" cy="70" r="52" fill="none" stroke={palette.agua} strokeWidth="12"
                    strokeDasharray={circ} strokeDashoffset={dashOffset} strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.4s" }} />
                </svg>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: palette.agua }}>{waterCount}</div>
                  <div style={{ fontSize: 11, color: palette.textMuted }}>de {waterGoal} vasos</div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => setWaterCount(c => Math.max(0, c - 1))} style={{ ...s.btnOutline, width: "auto", padding: "10px 22px", marginTop: 0 }}>− Quitar</button>
              <button onClick={() => setWaterCount(c => Math.min(waterGoal + 3, c + 1))} style={{ ...s.btn, width: "auto", padding: "10px 22px", marginTop: 0, background: palette.agua }}>+ Vaso 💧</button>
            </div>
            {waterCount >= waterGoal && (
              <div style={{ marginTop: 14, background: "#E8F4FB", borderRadius: 12, padding: "10px 14px" }}>
                <span style={{ fontSize: 13, color: palette.agua, fontWeight: 600 }}>🎉 ¡Meta cumplida! Muy bien, cariño.</span>
              </div>
            )}
          </div>

          <div style={s.card}>
            <h2 style={s.h2}>Meta diaria de vasos</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <input type="range" min={4} max={12} step={1} value={waterGoal} onChange={e => setWaterGoal(Number(e.target.value))} style={{ ...s.slider, flex: 1 }} />
              <span style={{ fontSize: 16, fontWeight: 600, color: palette.agua, minWidth: 70 }}>{waterGoal} vasos</span>
            </div>
            <p style={{ ...s.p, marginTop: 6 }}>Equivale a aprox. {waterGoal * 200} ml al día.</p>
          </div>

          <div style={{ ...s.card, background: "#E8F4FB", border: `1px solid #B5D4F4` }}>
            <h2 style={{ ...s.h2, color: palette.agua }}>💡 ¿Por qué es importante hidratarse?</h2>
            {["La deshidratación aumenta la sensibilidad al dolor","Beber agua ayuda a reducir la fatiga muscular","Una buena hidratación mejora la concentración y la niebla mental","Distribuye tus vasos a lo largo del día, no todos juntos"].map(tip => (
              <div key={tip} style={{ display: "flex", gap: 8, padding: "6px 0", borderBottom: `1px solid #B5D4F4` }}>
                <span style={{ color: palette.agua }}>💧</span>
                <span style={{ fontSize: 13, color: "#0C447C", lineHeight: 1.6 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── DIARIO DE SÍNTOMAS ────────────────────────────────────────────── */}
      {tab === "diario" && (
        <div style={s.section}>
          <h1 style={s.h1}>Mi diario de síntomas 📔</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Registra cómo te sientes cada día. Con el tiempo verás tus patrones y podrás compartirlo con tu médico.</p>

          {verEntrada ? (
            <div style={s.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: palette.textMuted }}>{new Date(verEntrada.fecha + "T12:00:00").toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" })}</span>
                <button onClick={() => setVerEntrada(null)} style={{ background: "none", border: "none", cursor: "pointer", color: palette.purple, fontSize: 13, fontWeight: 600 }}>← Volver</button>
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                {[["Dolor", verEntrada.dolor], ["Fatiga", verEntrada.fatiga]].map(([lbl, val]) => (
                  <div key={lbl} style={{ flex: 1, background: palette.purpleLight, borderRadius: 10, padding: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: palette.textMuted }}>{lbl}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: palette.purpleDark }}>{val}/10</div>
                  </div>
                ))}
                <div style={{ flex: 1, background: palette.purpleLight, borderRadius: 10, padding: "10px", textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: palette.textMuted }}>Ánimo</div>
                  <div style={{ fontSize: 22 }}>{moodEmojis[verEntrada.mood]}</div>
                </div>
              </div>
              {verEntrada.sintomas.length > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, color: palette.textMuted, fontWeight: 600, marginBottom: 6 }}>Síntomas del día</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {verEntrada.sintomas.map(sm => <span key={sm} style={s.tag}>{sm}</span>)}
                  </div>
                </div>
              )}
              {verEntrada.texto && <p style={{ ...s.p, background: palette.beige, borderRadius: 10, padding: "10px 12px", fontStyle: "italic" }}>"{verEntrada.texto}"</p>}
            </div>
          ) : (
            <>
              <div style={s.card}>
                <h2 style={s.h2}>¿Cómo estás hoy?</h2>
                <SliderRow label="Nivel de dolor" value={diarioDolor} onChange={setDiarioDolor} />
                <SliderRow label="Nivel de fatiga" value={diarioFatiga} onChange={setDiarioFatiga} />
                <hr style={s.divider} />
                <MoodSelector value={diarioMood} onChange={setDiarioMood} />
                <hr style={s.divider} />
                <div style={{ fontSize: 13, color: palette.textMuted, fontWeight: 600, marginBottom: 8 }}>Síntomas de hoy</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 12 }}>
                  {sintomasOpciones.map(op => (
                    <button key={op} onClick={() => toggleSintoma(op)} style={{ background: diarioSintomas.includes(op) ? palette.purple : "transparent", color: diarioSintomas.includes(op) ? "#fff" : palette.textMuted, border: `1.5px solid ${diarioSintomas.includes(op) ? palette.purple : palette.lavender}`, borderRadius: 20, padding: "5px 12px", fontSize: 12, cursor: "pointer", fontWeight: 500 }}>{op}</button>
                  ))}
                </div>
                <label style={{ fontSize: 13, color: palette.textMuted, fontWeight: 600 }}>Nota del día</label>
                <textarea value={diarioTexto} onChange={e => setDiarioTexto(e.target.value)} placeholder="¿Cómo fue tu día? ¿Qué te ayudó? ¿Qué fue difícil?" rows={3} style={{ ...s.input, marginTop: 6, resize: "none" }} />
                <button style={s.btn} onClick={guardarDiario}>{diarioGuardado ? "✓ Guardado con amor 💜" : "Guardar entrada"}</button>
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase", letterSpacing: 0.5, margin: "4px 0 10px" }}>Entradas anteriores</div>
              {diarioEntradas.length === 0 && <p style={{ ...s.p, textAlign: "center" }}>Aún no hay entradas. ¡Empieza hoy!</p>}
              {diarioEntradas.map(entrada => (
                <div key={entrada.id} onClick={() => setVerEntrada(entrada)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 14, background: palette.card, border: `1px solid ${palette.purpleLight}`, marginBottom: 8, cursor: "pointer", boxShadow: `0 1px 6px ${palette.shadow}` }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: palette.purpleLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>{moodEmojis[entrada.mood]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: palette.text }}>{new Date(entrada.fecha + "T12:00:00").toLocaleDateString("es-MX", { weekday: "short", day: "numeric", month: "short" })}</div>
                    <div style={{ fontSize: 11, color: palette.textMuted }}>Dolor {entrada.dolor}/10 · Fatiga {entrada.fatiga}/10{entrada.sintomas.length > 0 ? ` · ${entrada.sintomas.length} síntomas` : ""}</div>
                  </div>
                  <span style={{ fontSize: 12, color: palette.purple }}>Ver →</span>
                </div>
              ))}
            </>
          )}
        </div>
      )}

        
      p>
        
                
              ))}
            </div>
          ))}
          <CTACard />
        </div>
      )}
    </div>
  );
}
