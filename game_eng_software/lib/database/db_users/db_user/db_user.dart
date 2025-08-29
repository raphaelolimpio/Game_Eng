import 'dart:convert';
import 'package:http/http.dart' as http;

class DbUser {
  final String baseUrl = 'http://localhost:3000/users';

  Future<List<dynamic>> getUsers() async {
    final response = await http.get(Uri.parse(baseUrl));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load users');
    }
  }

  Future<dynamic> getUserById(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/$id'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else if (response.statusCode == 404) {
      throw Exception('User not found');
    } else {
      throw Exception('Failed to load user');
    }
  }

  Future<void> createUser(
    String name,
    String email,
    String password,
    String registration,
    int idFunction,
    int idGroup,
    int idClass,
  ) async {
    final response = await http.post(
      Uri.parse(baseUrl),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'name': name,
        'email': email,
        'password': password,
        'registration': registration,
        'idFunction': idFunction,
        'idGroup': idGroup,
        'idClass': idClass,
      }),
    );

    if (response.statusCode != 201) {
      throw Exception('Falha ao criar o usuário');
    }
  }

  Future<void> updateUser(
    int id,
    String name,
    String email,
    String password,
    String registration,
    int idFunction,
    int idGroup,
    int idClass,
  ) async {
    final response = await http.put(
      Uri.parse('$baseUrl/$id'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'name': name,
        'email': email,
        'password': password,
        'registration': registration,
        'idFunction': idFunction,
        'idGroup': idGroup,
        'idClass': idClass,
      }),
    );

    if (response.statusCode != 200) {
      throw Exception('Falha ao atualizar o usuário');
    }
  }

  Future<void> deleteUser(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/$id'));

    if (response.statusCode != 200) {
      throw Exception('Falha ao deletar o usuário');
    }
  }
}
