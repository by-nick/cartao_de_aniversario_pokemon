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
            
            const cardInner = document.createElement('div');
            cardInner.className = 'card-inner';
            
            // Frente da carta (?)
            const cardFront = document.createElement('div');
            cardFront.className = 'card-front';
            cardFront.textContent = '?';
            
            // Verso da carta (Pokémon)
            const cardBack = document.createElement('div');
            cardBack.className = 'card-back';
            
            // Emoji do Pokémon
            const emoji = document.createElement('div');
            emoji.className = 'pokemon-emoji';
            emoji.textContent = pokemonEmojis[pokemon] || '❓';
            
            // Nome do Pokémon
            const name = document.createElement('div');
            name.className = 'pokemon-name';
            name.textContent = pokemon;
            
            cardBack.appendChild(emoji);
            cardBack.appendChild(name);
            
            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);
            
            card.addEventListener('click', function() {
                if (memoryGame.canFlip && !this.classList.contains('flipped') && 
                    !this.classList.contains('matched') && memoryGame.flippedCards.length < 2) {
                    flipCard.call(this);
                }
            });
            
            memoryGridEl.appendChild(card);
        });
    }
    
    function startMemoryGame() {
        memoryGame.canFlip = true;
        memoryGame.timerInterval = setInterval(() => {
            memoryGame.time++;
            const minutes = Math.floor(memoryGame.time / 60).toString().padStart(2, '0');
            const seconds = (memoryGame.time % 60).toString().padStart(2, '0');
            timerEl.textContent = `${minutes}:${seconds}`;
        }, 1000);
        
        startMemoryBtn.disabled = true;
        startMemoryBtn.innerHTML = '<i class="fas fa-play"></i> Jogo Iniciado';
        startMemoryBtn.style.opacity = '0.7';
    }
    
    function flipCard() {
        this.classList.add('flipped');
        memoryGame.flippedCards.push(this);
        
        if (memoryGame.flippedCards.length === 2) {
            memoryGame.moves++;
            movesEl.textContent = memoryGame.moves;
            
            const card1 = memoryGame.flippedCards[0];
            const card2 = memoryGame.flippedCards[1];
            const isMatch = card1.dataset.pokemon === card2.dataset.pokemon;
            
            if (isMatch) {
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
    
    function showVictoryMessage() {
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
    }
    
    startMemoryBtn.addEventListener('click', startMemoryGame);
    
    restartMemoryBtn.addEventListener('click', function() {
        initMemoryGame();
        startMemoryBtn.disabled = false;
        startMemoryBtn.innerHTML = '<i class="fas fa-play"></i> Iniciar Jogo';
        startMemoryBtn.style.opacity = '1';
    });
    
    // Inicializar jogo da memória
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
        
        setTimeout(() => {
            ball.style.top = '250px';
        }, 10);
        
        setTimeout(() => {
            const pokemonLeft = parseFloat(pokemonToCatch.style.left);
            const hit = pokemonLeft > 45 && pokemonLeft < 55;
            
            if (hit) {
                catchGame.catches++;
                catchesEl.textContent = catchGame.catches;
                
                ball.style.transform = 'translateX(-50%) scale(1.3)';
                ball.style.filter = 'brightness(1.3) drop-shadow(0 0 15px gold)';
                
                if (catchGame.catches > catchGame.record) {
                    catchGame.record = catchGame.catches;
                    recordEl.textContent = catchGame.record;
                    localStorage.setItem('pokemonCatchRecord', catchGame.record);
                }
                
                catchGame.speed = Math.min(catchGame.speed + 0.2, 6);
            } else {
                ball.style.opacity = '0.7';
                ball.style.filter = 'grayscale(0.5)';
            }
            
            updateStats();
            
            setTimeout(() => {
                if (ball.parentNode) {
                    ball.remove();
                }
            }, 1000);
            
        }, 400);
    }
    
    pokemonOptions.forEach(option => {
        option.addEventListener('click', function() {
            pokemonOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            const pokemonName = this.getAttribute('data-pokemon');
            const pokemonId = this.getAttribute('data-id');
            
            catchGame.currentPokemon = pokemonName;
            catchGame.currentPokemonId = pokemonId;
            currentPokemonEl.textContent = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
            
            pokemonToCatch.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
            
            catchGame.speed = 2;
            updateStats();
        });
    });
    
    changePokemonBtn.addEventListener('click', function() {
        const currentIndex = Array.from(pokemonOptions).findIndex(opt => 
            opt.getAttribute('data-pokemon') === catchGame.currentPokemon);
        const nextIndex = (currentIndex + 1) % pokemonOptions.length;
        pokemonOptions[nextIndex].click();
    });
    
    throwBallBtn.addEventListener('click', throwPokeball);
    pokeballThrow.addEventListener('click', throwPokeball);
    
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
    
    document.querySelector('.game-tab[data-game="catch"]').addEventListener('click', function() {
        setTimeout(() => {
            if (!catchGame.isMoving) {
                startPokemonMovement();
            }
        }, 100);
    });
    
    initCatchGame();
});