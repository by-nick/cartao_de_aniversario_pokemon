alert('Aqui estão alguns jogos que fiz para você sobre Pokémon. Espero que goste <3 ')

// ========== SISTEMA DE ABAS DOS JOGOS ==========
document.addEventListener('DOMContentLoaded', function() {
    const gameTabs = document.querySelectorAll('.game-tab');
    const gameContents = document.querySelectorAll('.game-content');
    
    gameTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const gameId = this.getAttribute('data-game');
            
            // Ativar aba
            gameTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar conteúdo correspondente
            gameContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${gameId}-game`).classList.add('active');
            
            // Inicializar jogo se necessário
            if (gameId === 'memory') initMemoryGame();
            if (gameId === 'catch') initCatchGame();
        });
    });
    
    // ========== JOGO 1: QUIZ POKÉMON ==========
    const quizQuestions = [
        {
            question: "Qual é o tipo principal do Pikachu?",
            options: ["Água", "Elétrico", "Fogo", "Psíquico"],
            answer: 1,
            funFact: "Pikachu é o Pokémon mais famoso do mundo!"
        },
        {
            question: "Qual Pokémon é conhecido como 'Pokémon Sombra'?",
            options: ["Haunter", "Gengar", "Misdreavus", "Sableye"],
            answer: 1,
            funFact: "Gengar é a evolução final de Gastly!"
        },
        {
            question: "Quantas evoluções o Eevee tem?",
            options: ["5", "7", "8", "10"],
            answer: 2,
            funFact: "Eevee pode evoluir para 8 formas diferentes!"
        },
        {
            question: "Qual destes NÃO é um Pokémon inicial de Kanto?",
            options: ["Bulbasaur", "Charmander", "Squirtle", "Pikachu"],
            answer: 3,
            funFact: "Pikachu é o mascote, mas não um inicial tradicional!"
        },
        {
            question: "Qual é a evolução final do Charmander?",
            options: ["Charmeleon", "Charizard", "Dragonite", "Arcanine"],
            answer: 1,
            funFact: "Charizard é um dos Pokémon mais populares!"
        },
        {
            question: "Qual Pokémon lendário representa a renovação?",
            options: ["Mewtwo", "Ho-Oh", "Lugia", "Celebi"],
            answer: 1,
            funFact: "Ho-Oh aparece no arco íris segundo as lendas!"
        },
        {
            question: "Qual tipo é super efetivo contra Gengar?",
            options: ["Fantasma", "Psíquico", "Sombrio", "Terrestre"],
            answer: 2,
            funFact: "Gengar tem duplo tipo Fantasma/Veneno!"
        },
        {
            question: "Quantas badges existem na região de Kanto?",
            options: ["6", "8", "10", "12"],
            answer: 1,
            funFact: "Ash conseguiu todas as 8 badges de Kanto!"
        }
    ];
    
    let currentQuizQuestion = 0;
    let quizScore = 0;
    let selectedOption = null;
    
    const quizQuestionEl = document.getElementById('quiz-question');
    const quizOptionsEl = document.getElementById('quiz-options');
    const quizScoreEl = document.getElementById('quiz-score');
    const questionNumberEl = document.getElementById('question-number');
    const submitAnswerBtn = document.getElementById('submit-answer');
    const nextQuestionBtn = document.getElementById('next-question');
    const resetQuizBtn = document.getElementById('reset-quiz');
    const quizFeedbackEl = document.getElementById('quiz-feedback');
    
    function loadQuizQuestion() {
        const question = quizQuestions[currentQuizQuestion];
        quizQuestionEl.textContent = question.question;
        quizOptionsEl.innerHTML = '';
        questionNumberEl.textContent = `${currentQuizQuestion + 1}/${quizQuestions.length}`;
        
        question.options.forEach((option, index) => {
            const optionEl = document.createElement('div');
            optionEl.className = 'quiz-option';
            optionEl.textContent = option;
            optionEl.dataset.index = index;
            
            optionEl.addEventListener('click', function() {
                document.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
                selectedOption = parseInt(this.dataset.index);
            });
            
            quizOptionsEl.appendChild(optionEl);
        });
        
        quizFeedbackEl.style.display = 'none';
        submitAnswerBtn.style.display = 'flex';
        nextQuestionBtn.style.display = 'none';
        selectedOption = null;
    }
    
    submitAnswerBtn.addEventListener('click', function() {
        if (selectedOption === null) {
            quizFeedbackEl.textContent = "Selecione uma opção antes de responder!";
            quizFeedbackEl.className = 'quiz-feedback incorrect';
            quizFeedbackEl.style.display = 'block';
            return;
        }
        
        const question = quizQuestions[currentQuizQuestion];
        const correct = selectedOption === question.answer;
        
        if (correct) {
            quizScore += 100;
            quizScoreEl.textContent = quizScore;
            quizFeedbackEl.innerHTML = `
                <div>✅ Correto! +100 pontos!</div>
                <div style="margin-top: 10px; font-size: 0.9rem; color: #95a5a6;">
                    Curiosidade: ${question.funFact}
                </div>
            `;
            quizFeedbackEl.className = 'quiz-feedback correct';
        } else {
            quizFeedbackEl.innerHTML = `
                <div>❌ Incorreto! A resposta correta é: ${question.options[question.answer]}</div>
                <div style="margin-top: 10px; font-size: 0.9rem; color: #95a5a6;">
                    ${question.funFact}
                </div>
            `;
            quizFeedbackEl.className = 'quiz-feedback incorrect';
        }
        
        quizFeedbackEl.style.display = 'block';
        submitAnswerBtn.style.display = 'none';
        nextQuestionBtn.style.display = 'flex';
    });
    
    nextQuestionBtn.addEventListener('click', function() {
        currentQuizQuestion = (currentQuizQuestion + 1) % quizQuestions.length;
        loadQuizQuestion();
    });
    
    resetQuizBtn.addEventListener('click', function() {
        currentQuizQuestion = 0;
        quizScore = 0;
        quizScoreEl.textContent = '0';
        loadQuizQuestion();
        
        quizFeedbackEl.innerHTML = '<div>Quiz reiniciado! Boa sorte!</div>';
        quizFeedbackEl.className = 'quiz-feedback correct';
        quizFeedbackEl.style.display = 'block';
        
        setTimeout(() => {
            quizFeedbackEl.style.display = 'none';
        }, 2000);
    });
    
    // Inicializar quiz
    loadQuizQuestion();
    
    // ========== JOGO 2: MEMÓRIA POKÉMON ==========
const memoryCards = ['Pikachu', 'Bulbasaur', 'Charmander', 'Squirtle', 'Gengar', 'Eevee', 'Jigglypuff', 'Snorlax'];

// Emojis correspondentes a cada Pokémon
const pokemonEmojis = {
    'Pikachu': '⚡',
    'Bulbasaur': '🌱',
    'Charmander': '🔥',
    'Squirtle': '💧',
    'Gengar': '👻',
    'Eevee': '🦊',
    'Jigglypuff': '🎤',
    'Snorlax': '😴'
};

// Descrições curtas para cada Pokémon
const pokemonDescriptions = {
    'Pikachu': 'Rato Elétrico',
    'Bulbasaur': 'Semente',
    'Charmander': 'Lagarto de Fogo',
    'Squirtle': 'Tartaruga',
    'Gengar': 'Sombra',
    'Eevee': 'Evolução',
    'Jigglypuff': 'Bala Cantora',
    'Snorlax': 'Dorminhoco'
};

let memoryGame = {
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    canFlip: false,
    time: 0,
    timerInterval: null
};

const memoryGridEl = document.getElementById('memory-grid');
const movesEl = document.getElementById('moves');
const pairsEl = document.getElementById('pairs');
const timerEl = document.getElementById('timer');
const startMemoryBtn = document.getElementById('start-memory');
const restartMemoryBtn = document.getElementById('restart-memory');

function initMemoryGame() {
    memoryGame.cards = [...memoryCards, ...memoryCards];
    memoryGame.cards.sort(() => Math.random() - 0.5);
    memoryGame.flippedCards = [];
    memoryGame.matchedPairs = 0;
    memoryGame.moves = 0;
    memoryGame.canFlip = false;
    memoryGame.time = 0;
    
    clearInterval(memoryGame.timerInterval);
    timerEl.textContent = '00:00';
    movesEl.textContent = '0';
    pairsEl.textContent = '0/8';
    memoryGridEl.innerHTML = '';
    
    memoryGame.cards.forEach((pokemon, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.pokemon = pokemon;
        card.dataset.index = index;
        
        // Criar emoji do Pokémon
        const emoji = document.createElement('div');
        emoji.className = 'pokemon-emoji';
        emoji.textContent = pokemonEmojis[pokemon] || '❓';
        emoji.title = pokemon; // Tooltip com nome
        
        // Criar nome e descrição do Pokémon
        const name = document.createElement('div');
        name.className = 'pokemon-name';
        name.innerHTML = `${pokemon}<br><span style="font-size: 0.5rem; color: rgba(255,255,255,0.8)">${pokemonDescriptions[pokemon]}</span>`;
        
        card.appendChild(emoji);
        card.appendChild(name);
        
        // Adicionar efeito sonoro (opcional)
        card.addEventListener('click', function() {
            playCardSound();
            flipCard.call(this);
        });
        
        memoryGridEl.appendChild(card);
    });
}

function playCardSound() {
    // Som simples de clique
    const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==');
    audio.volume = 0.2;
    audio.play().catch(e => console.log("Som não pode ser reproduzido"));
}

function startMemoryGame() {
    memoryGame.canFlip = true;
    memoryGame.timerInterval = setInterval(() => {
        memoryGame.time++;
        const minutes = Math.floor(memoryGame.time / 60).toString().padStart(2, '0');
        const seconds = (memoryGame.time % 60).toString().padStart(2, '0');
        timerEl.textContent = `${minutes}:${seconds}`;
    }, 1000);
}

function flipCard() {
    if (!memoryGame.canFlip || this.classList.contains('flipped') || 
        this.classList.contains('matched') || memoryGame.flippedCards.length >= 2) {
        return;
    }
    
    this.classList.add('flipped');
    memoryGame.flippedCards.push(this);
    
    if (memoryGame.flippedCards.length === 2) {
        memoryGame.moves++;
        movesEl.textContent = memoryGame.moves;
        
        const card1 = memoryGame.flippedCards[0];
        const card2 = memoryGame.flippedCards[1];
        
        if (card1.dataset.pokemon === card2.dataset.pokemon) {
            // Par encontrado
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                memoryGame.matchedPairs++;
                pairsEl.textContent = `${memoryGame.matchedPairs}/8`;
                memoryGame.flippedCards = [];
                
                // Som de sucesso
                playMatchSound();
                
                // Verificar vitória
                if (memoryGame.matchedPairs === 8) {
                    clearInterval(memoryGame.timerInterval);
                    setTimeout(() => {
                        playVictorySound();
                        showVictoryMessage();
                    }, 500);
                }
            }, 500);
        } else {
            // Não é par
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                memoryGame.flippedCards = [];
            }, 1000);
        }
    }
}

function playMatchSound() {
    // Som de combinação bem-sucedida
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 523.25; // Nota C5
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log("Audio Context não suportado");
    }
}

function playVictorySound() {
    // Sequência de notas para vitória
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        
        notes.forEach((frequency, index) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = frequency;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
            }, index * 200);
        });
    } catch (e) {
        console.log("Audio Context não suportado");
    }
}

function showVictoryMessage() {
    // Criar mensagem de vitória
    const victoryMessage = document.createElement('div');
    victoryMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #2ecc71, #27ae60);
        color: white;
        padding: 30px;
        border-radius: 20px;
        text-align: center;
        z-index: 1000;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        border: 5px solid gold;
        animation: popIn 0.5s ease-out;
        max-width: 80%;
    `;
    
    victoryMessage.innerHTML = `
        <h3 style="font-family: 'Press Start 2P', cursive; margin-bottom: 15px; color: gold;">
            🎉 VITÓRIA! 🎉
        </h3>
        <p style="font-size: 1.2rem; margin-bottom: 10px;">
            Você completou o jogo da memória!
        </p>
        <p style="font-size: 1rem; margin-bottom: 20px;">
            <strong>Movimentos:</strong> ${memoryGame.moves}<br>
            <strong>Tempo:</strong> ${Math.floor(memoryGame.time / 60)}:${(memoryGame.time % 60).toString().padStart(2, '0')}
        </p>
        <button onclick="this.parentElement.remove()" style="
            background: #e74c3c;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 10px;
            font-family: 'Press Start 2P', cursive;
            cursor: pointer;
            font-size: 0.8rem;
        ">
            Fechar
        </button>
    `;
    
    document.body.appendChild(victoryMessage);
    
    // Adicionar estilo de animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popIn {
            0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

startMemoryBtn.addEventListener('click', function() {
    startMemoryGame();
    this.disabled = true;
    this.innerHTML = '<i class="fas fa-play"></i> Jogo Iniciado';
    this.style.opacity = '0.7';
    
    // Feedback visual
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);
});

restartMemoryBtn.addEventListener('click', function() {
    initMemoryGame();
    startMemoryBtn.disabled = false;
    startMemoryBtn.innerHTML = '<i class="fas fa-play"></i> Iniciar Jogo';
    startMemoryBtn.style.opacity = '1';
    
    // Feedback visual
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);
});

// Inicializar jogo da memória
initMemoryGame();
    
    function startMemoryGame() {
        memoryGame.canFlip = true;
        memoryGame.timerInterval = setInterval(() => {
            memoryGame.time++;
            const minutes = Math.floor(memoryGame.time / 60).toString().padStart(2, '0');
            const seconds = (memoryGame.time % 60).toString().padStart(2, '0');
            timerEl.textContent = `${minutes}:${seconds}`;
        }, 1000);
    }
    
    function flipCard() {
        if (!memoryGame.canFlip || this.classList.contains('flipped') || 
            this.classList.contains('matched') || memoryGame.flippedCards.length >= 2) {
            return;
        }
        
        this.classList.add('flipped');
        memoryGame.flippedCards.push(this);
        
        if (memoryGame.flippedCards.length === 2) {
            memoryGame.moves++;
            movesEl.textContent = memoryGame.moves;
            
            const card1 = memoryGame.flippedCards[0];
            const card2 = memoryGame.flippedCards[1];
            
            if (card1.dataset.pokemon === card2.dataset.pokemon) {
                // Par encontrado
                setTimeout(() => {
                    card1.classList.add('matched');
                    card2.classList.add('matched');
                    memoryGame.matchedPairs++;
                    pairsEl.textContent = `${memoryGame.matchedPairs}/8`;
                    memoryGame.flippedCards = [];
                    
                    // Verificar vitória
                    if (memoryGame.matchedPairs === 8) {
                        clearInterval(memoryGame.timerInterval);
                        setTimeout(() => {
                            alert(`🎉 Parabéns! Você completou o jogo da memória em ${memoryGame.moves} movimentos e ${memoryGame.time} segundos!`);
                        }, 500);
                    }
                }, 500);
            } else {
                // Não é par
                setTimeout(() => {
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    memoryGame.flippedCards = [];
                }, 1000);
            }
        }
    }
    
    startMemoryBtn.addEventListener('click', function() {
        startMemoryGame();
        this.disabled = true;
        this.innerHTML = '<i class="fas fa-play"></i> Jogo Iniciado';
    });
    
    restartMemoryBtn.addEventListener('click', function() {
        initMemoryGame();
        startMemoryBtn.disabled = false;
        startMemoryBtn.innerHTML = '<i class="fas fa-play"></i> Iniciar Jogo';
    });
    
    // Inicializar memória (sem iniciar)
    initMemoryGame();
    
    // ========== JOGO 3: CAPTURA POKÉMON ==========
    let catchGame = {
        catches: 0,
        attempts: 0,
        record: localStorage.getItem('pokemonCatchRecord') || 0,
        pokemonPosition: 50,
        pokemonSpeed: 2,
        direction: 1,
        currentPokemon: 'pikachu',
        currentPokemonId: '25',
        difficulty: 'Fácil',
        isMoving: false,
        moveInterval: null
    };
    
    const catchesEl = document.getElementById('catches');
    const attemptsEl = document.getElementById('attempts');
    const accuracyEl = document.getElementById('accuracy');
    const recordEl = document.getElementById('record');
    const currentPokemonEl = document.getElementById('current-pokemon');
    const difficultyEl = document.getElementById('difficulty');
    const pokemonToCatch = document.getElementById('pokemon-to-catch');
    const pokeballThrow = document.getElementById('pokeball-throw');
    const throwBallBtn = document.getElementById('throw-ball');
    const changePokemonBtn = document.getElementById('change-pokemon');
    const resetCatchBtn = document.getElementById('reset-catch');
    const catchArea = document.getElementById('catch-area');
    const pokemonOptions = document.querySelectorAll('.pokemon-option');
    
    recordEl.textContent = catchGame.record;
    
    function initCatchGame() {
        updatePokemonPosition();
        if (!catchGame.isMoving) {
            startPokemonMovement();
        }
        updateStats();
    }
    
    function startPokemonMovement() {
        catchGame.isMoving = true;
        clearInterval(catchGame.moveInterval);
        
        catchGame.moveInterval = setInterval(() => {
            catchGame.pokemonPosition += catchGame.speed * catchGame.direction;
            
            if (catchGame.pokemonPosition > 85 || catchGame.pokemonPosition < 15) {
                catchGame.direction *= -1;
            }
            
            updatePokemonPosition();
        }, 50);
    }
    
    function updatePokemonPosition() {
        pokemonToCatch.style.left = `${catchGame.pokemonPosition}%`;
    }
    
    function updateStats() {
        const accuracy = catchGame.attempts > 0 ? 
            Math.round((catchGame.catches / catchGame.attempts) * 100) : 0;
        accuracyEl.textContent = `${accuracy}%`;
        
        // Atualizar dificuldade baseada na precisão
        if (accuracy > 70) {
            catchGame.difficulty = 'Difícil';
            catchGame.speed = 4;
        } else if (accuracy > 40) {
            catchGame.difficulty = 'Médio';
            catchGame.speed = 3;
        } else {
            catchGame.difficulty = 'Fácil';
            catchGame.speed = 2;
        }
        
        difficultyEl.textContent = catchGame.difficulty;
    }
    
    function throwPokeball() {
        if (!catchGame.isMoving) return;
        
        catchGame.attempts++;
        attemptsEl.textContent = catchGame.attempts;
        
        const ball = document.createElement('img');
        ball.src = 'https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg';
        ball.className = 'pokeball-throw';
        ball.style.position = 'absolute';
        ball.style.width = '70px';
        ball.style.height = '70px';
        ball.style.top = '50px';
        ball.style.left = '50%';
        ball.style.transform = 'translateX(-50%)';
        ball.style.transition = 'top 0.4s ease-in';
        ball.style.zIndex = '5';
        
        catchArea.appendChild(ball);
        
        // Animar queda da pokébola
        setTimeout(() => {
            ball.style.top = '250px';
        }, 10);
        
        // Verificar se acertou
        setTimeout(() => {
            const pokemonLeft = parseFloat(pokemonToCatch.style.left);
            const hit = pokemonLeft > 45 && pokemonLeft < 55;
            
            if (hit) {
                catchGame.catches++;
                catchesEl.textContent = catchGame.catches;
                
                // Efeito visual de captura
                ball.style.transform = 'translateX(-50%) scale(1.3)';
                ball.style.filter = 'brightness(1.3) drop-shadow(0 0 15px gold)';
                pokemonToCatch.style.filter = 'brightness(0.7)';
                
                // Efeito de brilho no Pokémon
                const glow = document.createElement('div');
                glow.style.position = 'absolute';
                glow.style.width = '150px';
                glow.style.height = '150px';
                glow.style.background = 'radial-gradient(circle, rgba(255,215,0,0.5) 0%, rgba(255,215,0,0) 70%)';
                glow.style.borderRadius = '50%';
                glow.style.left = `${pokemonLeft}%`;
                glow.style.top = '50%';
                glow.style.transform = 'translate(-50%, -50%)';
                glow.style.zIndex = '4';
                catchArea.appendChild(glow);
                
                setTimeout(() => {
                    glow.remove();
                    pokemonToCatch.style.filter = 'none';
                }, 500);
                
                // Atualizar recorde
                if (catchGame.catches > catchGame.record) {
                    catchGame.record = catchGame.catches;
                    recordEl.textContent = catchGame.record;
                    localStorage.setItem('pokemonCatchRecord', catchGame.record);
                    
                    // Efeito especial para novo recorde
                    const recordEffect = document.createElement('div');
                    recordEffect.style.position = 'absolute';
                    recordEffect.style.top = '50%';
                    recordEffect.style.left = '50%';
                    recordEffect.style.transform = 'translate(-50%, -50%)';
                    recordEffect.style.fontSize = '2rem';
                    recordEffect.style.color = 'gold';
                    recordEffect.style.fontWeight = 'bold';
                    recordEffect.style.textShadow = '0 0 10px black';
                    recordEffect.style.zIndex = '10';
                    recordEffect.textContent = 'NOVO RECORDE!';
                    catchArea.appendChild(recordEffect);
                    
                    setTimeout(() => {
                        recordEffect.remove();
                    }, 1500);
                }
                
                // Aumentar velocidade do Pokémon
                catchGame.speed = Math.min(catchGame.speed + 0.2, 6);
            } else {
                ball.style.opacity = '0.7';
                ball.style.filter = 'grayscale(0.5)';
            }
            
            // Atualizar estatísticas
            updateStats();
            
            // Remover pokébola após animação
            setTimeout(() => {
                if (ball.parentNode) {
                    ball.remove();
                }
            }, 1000);
            
        }, 400);
    }
    
    // Selecionar Pokémon diferente
    pokemonOptions.forEach(option => {
        option.addEventListener('click', function() {
            pokemonOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            const pokemonName = this.getAttribute('data-pokemon');
            const pokemonId = this.getAttribute('data-id');
            
            catchGame.currentPokemon = pokemonName;
            catchGame.currentPokemonId = pokemonId;
            currentPokemonEl.textContent = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
            
            // Atualizar imagem do Pokémon
            pokemonToCatch.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
            
            // Resetar velocidade para novo Pokémon
            catchGame.speed = 2;
            updateStats();
        });
    });
    
    // Botão para trocar Pokémon
    changePokemonBtn.addEventListener('click', function() {
        const currentIndex = Array.from(pokemonOptions).findIndex(opt => 
            opt.getAttribute('data-pokemon') === catchGame.currentPokemon);
        const nextIndex = (currentIndex + 1) % pokemonOptions.length;
        pokemonOptions[nextIndex].click();
    });
    
    // Botão para lançar pokébola
    throwBallBtn.addEventListener('click', throwPokeball);
    pokeballThrow.addEventListener('click', throwPokeball);
    
    // Botão para resetar jogo
    resetCatchBtn.addEventListener('click', function() {
        catchGame.catches = 0;
        catchGame.attempts = 0;
        catchGame.pokemonPosition = 50;
        catchGame.speed = 2;
        
        catchesEl.textContent = '0';
        attemptsEl.textContent = '0';
        accuracyEl.textContent = '0%';
        
        updateStats();
        updatePokemonPosition();
    });
    
    // Iniciar movimento do Pokémon quando a aba for ativada
    document.querySelector('.game-tab[data-game="catch"]').addEventListener('click', function() {
        setTimeout(() => {
            if (!catchGame.isMoving) {
                startPokemonMovement();
            }
        }, 100);
    });
    
    // Inicializar jogo de captura
    initCatchGame();
    
    // ========== EFEITOS VISUAIS ==========
    function createConfetti() {
        const colors = ['#e74c3c', '#3498db', '#f1c40f', '#2ecc71', '#9b59b6'];
        const catchAreaRect = catchArea.getBoundingClientRect();
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.left = Math.random() * catchAreaRect.width + 'px';
            confetti.style.top = '-20px';
            confetti.style.zIndex = '999';
            
            catchArea.appendChild(confetti);
            
            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${catchAreaRect.height + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: 1500 + Math.random() * 2000,
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
            });
            
            animation.onfinish = () => confetti.remove();
        }
    }
    
    // Adicionar efeito de confetti em capturas bem sucedidas
    const originalThrowPokeball = throwPokeball;
    throwPokeball = function() {
        originalThrowPokeball();
        // Verificar se foi uma captura bem sucedida após um delay
        setTimeout(() => {
            if (Math.random() > 0.7) { // 30% de chance de confetti
                createConfetti();
            }
        }, 450);
    };
});